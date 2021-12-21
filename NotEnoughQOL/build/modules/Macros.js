import { ClickMacro } from "../util/ClickMacro";
import { C09PacketHeldItemChange, C08PacketPlayerBlockPlacement, openInventory, mc, BlockPos, config, macros, BIND_PREFIX, SLAYER_PREFIX, DUNGEONS_PREFIX, CHAT_PREFIX, MISC_PREFIX, containsItem, getCurrentSlot, PREFIX, setSlot, LeftClick, RightClick, ITEM_PREFIX, ADVANCE_PREFIX, GUI_PREFIX, dungeons } from "../index";

const GhostBlock = new KeyBind("Ghost Blocks", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const RogueMacro = new KeyBind("Rogue Sword Macro", Keyboard.KEY_NONE, ITEM_PREFIX);
let lastInv = "";
let GhostBlocking = false;
new ClickMacro("packet", "right", new KeyBind("Teleport Macro", Keyboard.KEY_NONE, ITEM_PREFIX), 25, "isKeyDown", "Aspect of the End", "Aspect of the Void");
new ClickMacro("packet", "right", new KeyBind("Use Wither Cloak", Keyboard.KEY_NONE, ITEM_PREFIX), 25, "isPressed", "Wither Cloak Sword");
new ClickMacro("packet", "right", new KeyBind("Use Ice Spray", Keyboard.KEY_NONE, ITEM_PREFIX), 25, "isPressed", "Ice Spray Wand");
new ClickMacro("packet", "right", new KeyBind("Use Wither Sword", Keyboard.KEY_NONE, ITEM_PREFIX), 25, "isPressed", "Hyperion", "Valkyrie", "Scylla", "Astraea");
new ClickMacro("packet", "right", new KeyBind("Use Fishing Rod", Keyboard.KEY_NONE, ITEM_PREFIX), 25, "isPressed", "rod of the sea", "auger rod");
new ClickMacro("packet", "left", new KeyBind("Use Gyro Wand", Keyboard.KEY_NONE, ITEM_PREFIX), 25, "isPressed", "gyrokinetic wand");
new ClickMacro("packet", "left", new KeyBind("Use Gloomlock Grimoire", Keyboard.KEY_NONE, ITEM_PREFIX), 25, "isPressed", "gloomlock grimoire");
new ClickMacro("packet", "right", new KeyBind("Use Leaps", Keyboard.KEY_NONE, ITEM_PREFIX), 25, "isPressed", "Spirit Leap");

let isPlaying = true;

register("gameLoad", () => {
    isPlaying = true;
})

register("gameUnload", () => {
    isPlaying = false;
})

register("tick", () => {
    if (!macros.autoSalvage)
        return;
    if (Player.getOpenedInventory() === null)
        return;
    if (Player.getOpenedInventory().getName().includes("Salvage Dungeon Item")) {
        let inv = Player.getOpenedInventory().getStackInSlot(22);
        if (inv.getID() === -1) {
            return;
        }
        if (Player.getOpenedInventory().getStackInSlot(13).getName().includes("✪"))
            return;
        if (inv.getLore()[9] === undefined)
            return;
        if (inv.getLore()[9].removeFormatting() === "Click to salvage!") {
            Player.getOpenedInventory().click(22);
        }
    }
});

register("step", () => {
    if (!macros.autoCombine)
        return;
    try {
        if (Player.getOpenedInventory() === null)
            return;
        if (Player.getOpenedInventory().getName().includes("Anvil")) {
            if (Player.getOpenedInventory().getStackInSlot(29).getName() === "tile.air.name" && Player.getOpenedInventory().getStackInSlot(33).getName() === "tile.air.name") {
                let bookArr = [];
                for (let i = Player.getOpenedInventory().getItems().length - 1; i > Player.getOpenedInventory().getItems().length - Player.getInventory().getItems().length; i--) {
                    let item = Player.getOpenedInventory().getStackInSlot(i);
                    if (item.getUnlocalizedName() === "item.enchantedBook") {
                        bookArr.push(i);
                    }
                }
                OuterLoop: for (let i = 0; i < bookArr.length; i++) {
                    for (let j = 0; j < bookArr.length; j++) {
                        if (i === j)
                            continue;
                        if (Player.getOpenedInventory().getStackInSlot(bookArr[i]) === null)
                            continue OuterLoop;
                        if (Player.getOpenedInventory().getStackInSlot(bookArr[j]) === null)
                            continue;
                        if (Player.getOpenedInventory().getStackInSlot(bookArr[i]).getLore()[1] === Player.getOpenedInventory().getStackInSlot(bookArr[j]).getLore()[1] && !Player.getOpenedInventory().getStackInSlot(bookArr[i]).getLore()[1].includes(" V")) {
                            Player.getOpenedInventory().click(bookArr[i], true);
                            Player.getOpenedInventory().click(bookArr[j], true);
                            let k = 0;
                            if (Player.getOpenedInventory().getStackInSlot(22) === null)
                                return;
                            new Thread(() => {
                                while (Player.getOpenedInventory().getStackInSlot(22).getLore()[5] !== "§5§o§30 Exp Levels") {
                                    Thread.sleep(50);
                                    k++;
                                    if (k > 100) {
                                        return;
                                    }
                                }
                                Player.getOpenedInventory().click(22);
                                Thread.sleep(300);
                                Player.getOpenedInventory().click(22);
                            }).start();
                        }
                    }
                }
            }
        }
    } catch (e) {
        print(e.message);
    }
}).setDelay(1);

register("tick", () => {
    if (GhostBlock.isKeyDown()) {
        if (dungeons.ghostBlockMode === 0) {
            if (Player.lookingAt().toString().startsWith("Block")) {
                if (Player.lookingAt().getUnlocalizedName() !== "tile.chest" && Player.lookingAt().getUnlocalizedName() !== "tile.chestTrap" && Player.lookingAt().getUnlocalizedName() !== "tile.lever" && Player.lookingAt().getUnlocalizedName() !== "tile.air") {
                    World.getWorld().func_175698_g(new BlockPos(Player.lookingAt().getX(), Player.lookingAt().getY(), Player.lookingAt().getZ()));
                }
            }
        }
    }
});

// register("tick", () => {
//     if (!RogueMacro.isPressed())
//         return;
//     new Thread(() => {
//         let playerSpeed = Player.getPlayer().func_70689_ay();
//         if (playerSpeed < 0.5) {
//             for (let i = 0; i < 9; i++) {
//                 if (Player.getInventory().getStackInSlot(i).getName().includes("Rogue")) {
//                     Client.sendPacket(new C09PacketHeldItemChange(i));
//                     while (playerSpeed < 0.5) {
//                         Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0));
//                         playerSpeed += 0.003;
//                         Thread.sleep(10);
//                     }
//                     Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
//                     break;
//                 }
//             }
//         }
//     }).start();
// });

new Thread(() => {
    while (isPlaying) {
        Thread.sleep(10)
        if (RogueMacro.isPressed()) {
            let playerSpeed = Player.getPlayer().func_70689_ay();
            if (playerSpeed < 0.5) {
                for (let i = 0; i < 9; i++) {
                    if (Player.getInventory().getStackInSlot(i).getName().includes("Rogue")) {
                        Client.sendPacket(new C09PacketHeldItemChange(i));
                        while (playerSpeed < 0.5) {
                            Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0));
                            playerSpeed += 0.003;
                            Thread.sleep(10);
                        }
                        Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
                        break;
                    }
                }
            }
        }
    }
}).start()

// const autoRogue = new KeyBind("Auto Rogue", Keyboard.KEY_NONE, ADVANCE_PREFIX)
// let autoSpeed = false;
// register("tick", () => {
//     if (!autoRogue.isPressed())
//         return;
//     ChatLib.chat(`${(autoSpeed = !autoSpeed) ? PREFIX + '&rAuto Rogue &aEnabled' : PREFIX + '&rAuto Rogue &cDisabled'}`);
// });

// register("tick", () => {
//     if (!autoSpeed)
//         return;
//     new Thread(() => {
//         let playerSpeed = Player.getPlayer().func_70689_ay();
//         if (playerSpeed < 0.5) {
//             for (let i = 0; i < 9; i++) {
//                 if (Player.getInventory().getStackInSlot(i).getName().includes("Rogue")) {
//                     Client.sendPacket(new C09PacketHeldItemChange(i));
//                     while (playerSpeed < 0.5) {
//                         Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0));
//                         playerSpeed += 0.003;
//                         Thread.sleep(10);
//                     }
//                     Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
//                     // break;
//                     Thread.sleep(macros.rogueTimeout)
//                 }
//             }
//         }
//     }).start();
// });


register("tick", (ticks) => {
    if (macros.autoHarp) {
        if (Player.getOpenedInventory().getName().startsWith("Harp - ")) {
            let currInv = getInventoryString();
            if (lastInv !== currInv) {
                lastInv = currInv;
                for (let i = 28; i < 35; i++) {
                    if (Player.getOpenedInventory().getStackInSlot(i).getUnlocalizedName() === "tile.cloth") {
                        Player.getOpenedInventory().click(i + 9, false, "MIDDLE");
                    }
                }
            }
        }
    }
    if (macros.autoMort) {
        if (ticks % 5 === 0) {
            if (Player.getOpenedInventory().getName() === "Start Dungeon?") {
                Player.getOpenedInventory().click(13, false, "MIDDLE");
            } else if (Player.getOpenedInventory().getName().startsWith("Catacombs - ")) {
                for (let i = 2; i < 7; i++) {
                    if (Player.getOpenedInventory().getStackInSlot(i).getName().removeFormatting().includes(Player.getName())) {
                        if (Player.getOpenedInventory().getStackInSlot(i + 9).getMetadata() === 14) {
                            Player.getOpenedInventory().click(i, false, "MIDDLE");
                            break;
                        }
                    }
                }
            }
        }
    }
});

const getInventoryString = () => {
    if (Player.getOpenedInventory() === null) {
        return "null";
    }
    return Player.getOpenedInventory().getItems().map((item) => {
        return item == null || item.getID() === -1 ? "null" : (item.getRegistryName() + ";" + item.getStackSize() + ";" + item.isEnchanted() + ";" + item.getRawNBT() + ";" + item.getMetadata());
    }).join("/");
};

const masterModeSix = new KeyBind("Join M6", Keyboard.KEY_NONE, CHAT_PREFIX);
const masterModeFive = new KeyBind("Join M5", Keyboard.KEY_NONE, CHAT_PREFIX);
const floorSeven = new KeyBind("Join F7", Keyboard.KEY_NONE, CHAT_PREFIX);
const necronRacist = new KeyBind("Necron Racist", Keyboard.KEY_NONE, CHAT_PREFIX);
const petsMacro = new KeyBind("Open Pets Menu", Keyboard.KEY_NONE, CHAT_PREFIX);
const warpForge = new KeyBind("Warp Forge", Keyboard.KEY_NONE, CHAT_PREFIX)

register("tick", () => {
    if (masterModeSix.isPressed()) {
        ChatLib.command("joindungeon master_catacombs 6");
        ChatLib.chat(PREFIX + "Entering a Master 6 Run");
    }
    if (masterModeFive.isPressed()) {
        ChatLib.command("joindungeon master_catacombs 5");
        ChatLib.chat(PREFIX + "Entering a Master 5 Run");
    }
    if (floorSeven.isPressed()) {
        ChatLib.command("joindungeon catacombs 7");
        ChatLib.chat(PREFIX + "Entering a Floor 7 Run");
    }
    if (petsMacro.isPressed()) {
        ChatLib.command("pets");
        ChatLib.chat("Opening Pets Menu");
    }
    if (warpForge.isPressed()) {
        ChatLib.command("warpforge");
        ChatLib.chat("Warping to Forge")
    }
    if (necronRacist.isPressed()) {
        ChatLib.command("gc nigge'rs")
    }
});

let ghost_ss_keybind = new KeyBind("Soul Whip Swap (Toggle)", Keyboard.KEY_NONE, ADVANCE_PREFIX);
let isGrindingGhosts = false;

register("tick", () => {
    if (ghost_ss_keybind.isPressed()) {
        ChatLib.chat(`${(isGrindingGhosts = !isGrindingGhosts) ? PREFIX + '&rGhost SwordSwap &aEnabled' : PREFIX + '&rGhost SwordSwap &cDisabled'}`);
    }
});

register("GuiOpened", () => {
    if (!macros.guiCheck)
        return;
    if (!isGrindingGhosts)
        return;
    isGrindingGhosts = false;
    ChatLib.chat(PREFIX + '&rGhost SwordSwap &cDisabled')
})

function checkHotbarSlots() {
    new Thread(() => {
        Player.getOpenedInventory().getItems().slice(36, 45).forEach((item, index) => {
            if (item.getName().includes("Giant's Sword") || item.getName().includes("Emerald Blade") || item.getName().includes("Valkyrie")) {
                giantsSlot = index;
            }
            if (item.getName().includes("Soul Whip")) {
                soulwhipSlot = index;
            }
        });
    }).start();
}

let giantsSlot;
let soulwhipSlot;

register("step", function() {
    new Thread(() => {
        if (isGrindingGhosts) {
            checkHotbarSlots();
            try {
                Player.setHeldItemIndex(giantsSlot);
                Player.setHeldItemIndex(soulwhipSlot);
                RightClick.invoke(Client.getMinecraft());
                Player.setHeldItemIndex(giantsSlot);
            } catch (e) {}
        }
    }).start();
}).setFps(2);

let legitendermankeybind = new KeyBind("Left Click Soulwhip", Keyboard.KEY_NONE, ADVANCE_PREFIX);
let soulwhip_swap_time = new Date().getTime();
let legitemantoggle = false;

register("clicked", (mouseX, mouseY, button) => {
    if (legitemantoggle && button === 0) {
        let atomsplitslot;
        let whipslot;
        Player.getOpenedInventory().getItems().slice(36, 45).forEach((item, index) => {
            if (item.getName().includes(macros.leftClickWhip)) {
                atomsplitslot = index;
            }
            if (item.getName().includes("Soul Whip")) {
                whipslot = index;
            }
        });
        if (new Date().getTime() - soulwhip_swap_time > 500) {
            if (Player.getHeldItem().getName().includes(macros.leftClickWhip)) {
                new Thread(() => {
                    Thread.sleep(75);
                    Player.setHeldItemIndex(whipslot);
                    RightClick.invoke(Client.getMinecraft());
                    Player.setHeldItemIndex(atomsplitslot);
                    soulwhip_swap_time = new Date().getTime();
                }).start();
            }
        }
    }
});

register("tick", () => {
    if (legitendermankeybind.isPressed()) {
        ChatLib.chat(`${(legitemantoggle = !legitemantoggle) ? PREFIX + '&rSoul Whip Swap &aEnabled' : PREFIX + '&rSoul Whip Swap &cDisabled'}`);
    }
});

register("GuiOpened", () => {
    if (!macros.guiCheck)
        return;
    if (!legitemantoggle)
        return;
    legitemantoggle = false;
    ChatLib.chat(PREFIX + '&rSoul Whip Swap &cDisabled&r')
})
const useEndStone = new KeyBind("Use End Stone Sword and Katana", Keyboard.KEY_NONE, ITEM_PREFIX)
const endStone = [
    "end stone"
]

register("tick", () => {
    if (useEndStone.isPressed()) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < endStone.length; j++) {
                if (Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes(endStone[j])) {
                    Client.sendPacket(new C09PacketHeldItemChange(i))
                    Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0))
                    break;
                }
            }
        }
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes("katana")) {
                Client.sendPacket(new C09PacketHeldItemChange(i))
                Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0))
                break;
            }
        }
        Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c))
    }
})


const useHealingSword = new KeyBind("Use Healing Sword", Keyboard.KEY_NONE, ITEM_PREFIX)
const healingSword = [
    "florid zombie"
]

register("tick", () => {
    if (useHealingSword.isPressed()) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < healingSword.length; j++) {
                if (Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes(healingSword[j])) {
                    Client.sendPacket(new C09PacketHeldItemChange(i))
                    Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0))
                    Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c))
                    break;
                }
            }
        }
    }
})

const mathReg = /^[0-9()*^+-/]*$/
register("chat", (solve) => {
    solve = solve.replace(/x/gi, "*")
    if (mathReg.test(solve)) {
        ChatLib.say(eval(solve))
    }
}).setChatCriteria("&r&d&lQUICK MATHS! &r&7Solve: &r&e${solve}&r")

register("chat", (solve) => {
    let unscr = unscramble(solve)
    console.log(unscr[0])
    ChatLib.say("/ac" + unscr[0])
}).setChatCriteria("&r&d&lSCRAMBLED! &r&7Unscramble: &r&e${solve}&r")

function unscramble(word) {
    let i = 0;
    let possibleResults = possibleScrambles.filter((a) => { return a.length === word.length })
    while (i < word.length) {
        let letter = word.substr(i, 1)
        possibleResults = possibleResults.filter((a) => { return a.includes(letter) })
        i++
    }
    return possibleResults
}

const useAxe = new KeyBind("Axe Swap", Keyboard.KEY_NONE, ADVANCE_PREFIX)
const theAxe = [
    "axe of the shredded"
]
let axeSwap = false;
register("tick", () => {
    if (macros.axeSwap === 0) {
        if (useAxe.isPressed()) {
            ChatLib.chat(`${(axeSwap = !axeSwap) ? PREFIX + '&rAxe Swap &aEnabled' : PREFIX + '&rAxe Swap &cDisabled'}`);
        }
    }
});

register("tick", () => {
    if (macros.axeSwap === 1) {
        if (useAxe.isKeyDown()) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < theAxe.length; j++) {
                    if (Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes(theAxe[j])) {
                        Client.sendPacket(new C09PacketHeldItemChange(i))
                        Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0))
                        Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c))
                        break;
                    }
                }
            }
        }
    } else if (macros.axeSwap === 0) {
        if (axeSwap) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < theAxe.length; j++) {
                    if (Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes(theAxe[j])) {
                        Client.sendPacket(new C09PacketHeldItemChange(i))
                        Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0))
                        Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c))
                        break;
                    }
                }
            }
        }
    }
})

register("GuiOpened", () => {
    if (macros.guiCheck === true) {
        if (macros.axeSwap === 0) {
            if (axeSwap) {
                axeSwap = false;
                ChatLib.chat(PREFIX + "&rAxe Swap &cDisabled&r")
            }
        }
    }
})

const useDrillAbil = new KeyBind("Blue Cheese Swap", Keyboard.KEY_NONE, ITEM_PREFIX)

register("tick", () => {
    if (useDrillAbil.isPressed()) {
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i).getRawNBT().includes("Blue Cheese Goblin Omelette Part")) {
                Client.sendPacket(new C09PacketHeldItemChange(i))
                Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0))
                Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c))
                break;
            }
        }
    }
})

function stripRank(rankedPlayer) {
    return rankedPlayer.replace(/\[[\w+\+-]+] /, "")
}

register("chat", (p1, p2) => {
    new Thread(() => {
        if (stripRank(p1) === Player.getName() && macros.autoTransfer === true) {
            ChatLib.command(`p transfer ${stripRank(p2)}`)
        }
    }).start()
}).setChatCriteria("The party was transferred to ${p1} by ${p2}")

register("chat", (p1, p2) => {
    new Thread(() => {
        if (stripRank(p1) === Player.getName() && macros.autoTransfer === true) {
            ChatLib.command(`p transfer ${stripRank(p2)}`)
        }
    }).start()
}).setChatCriteria("The party was transferred to ${p1} by ${p2}")

register("chat", (p1, p2) => {
    new Thread(() => {
        if (stripRank(p2) === Player.getName() && macros.autoTransfer === true) {
            ChatLib.command(`p transfer ${stripRank(p1)}`)
        }
    }).start()
}).setChatCriteria("${p1} has promoted ${p2} to Party Leader")




register("tick", () => {
    if (Player.getHeldItem().getName().includes('Stonk') || Player.getHeldItem().getName().includes('Golden Pickaxe')) {
        if (dungeons.stonkGB === true) {
            if (dungeons.stonkGBType === 0) {
                if (Player.lookingAt().toString().startsWith("Block")) {
                    if (mc.field_71474_y.field_74313_G.func_151470_d()) {
                        if (Player.lookingAt().getUnlocalizedName() !== "tile.chest" && Player.lookingAt().getUnlocalizedName() !== "tile.chestTrap" && Player.lookingAt().getUnlocalizedName() !== "tile.lever" && Player.lookingAt().getUnlocalizedName() !== "tile.air") {
                            World.getWorld().func_175698_g(new BlockPos(Player.lookingAt().getX(), Player.lookingAt().getY(), Player.lookingAt().getZ()));
                        }
                    }
                }
            } else if (dungeons.stonkGBType === 1) {
                if (mc.field_71474_y.field_74312_F.func_151470_d()) {
                    if (Player.lookingAt().getUnlocalizedName() !== "tile.chest" && Player.lookingAt().getUnlocalizedName() !== "tile.chestTrap" && Player.lookingAt().getUnlocalizedName() !== "tile.lever" && Player.lookingAt().getUnlocalizedName() !== "tile.air") {
                        World.getWorld().func_175698_g(new BlockPos(Player.lookingAt().getX(), Player.lookingAt().getY(), Player.lookingAt().getZ()));
                    }
                }
            }
        }
    }
});



let ahGuiOpen = false;


register("chat", () => {
    ChatLib.chat(PREFIX + "Reopening Auction House")
    ChatLib.command("ah")
    ahGuiOpen = true;
}).setChatCriteria("&r&cThere was an error with the auction house! &r&7(AUCTION_EXPIRED_OR_NOT_FOUND)&r").setContains();

register("postGuiRender", () => {
    if (ahGuiOpen) {
        let invname = Player.getOpenedInventory().getName()
        let inv = Player.getOpenedInventory()
        if (invname.includes("Auction House")) {
            for (let i = 0; i < 35; i++) {
                let item = Player.getOpenedInventory().getStackInSlot(i)
                if (item.getName().includes("Auctions Browser")) {
                    inv.click(i, false, "MIDDLE")
                }
            }
        }

    }
})



let editedThisGui = false;
let movedThisGui = false;
let lastX = 0;
let lastY = 0;
const Mouse = Java.type('org.lwjgl.input.Mouse');

register('guiOpened', () => {
    editedThisGui = false;
    movedThisGui = false;
});

register('guiRender', (x, y) => {
    try {
        if (movedThisGui) return;
        if (Player.getOpenedInventory().getName() !== 'Open a Jerry Box') return;
        if (!editedThisGui && lastX && lastY) {
            let scale = Renderer.screen.getScale();
            Mouse.setCursorPosition(lastX * scale, (Renderer.screen.getHeight() - lastY - 1) * scale);
            movedThisGui = true;
            return;
        }
        lastX = x;
        lastY = y;
        editedThisGui = true;
    } catch (e) {}
});

const boneStun = new KeyBind("F11 Bonemerang", Keyboard.KEY_NONE, ADVANCE_PREFIX)
let f11Bone = false;
register("tick", () => {
    if (boneStun.isPressed()) {
        ChatLib.chat(`
                $ {
                    (f11Bone = !f11Bone) ? PREFIX + "&rF11 Bonemerang &aEnabled": PREFIX + "&rF11 Bonemerang &cDisabled"
                }
                `)
    }
})


// register("tick", () => {
//     if (Player.getHeldItem().getName().includes("Bonemerang")) {
//         if (f11Bone) {
//             new Thread(() => {
//                 RightClick.invoke(Client.getMinecraft())
//                 Thread.sleep(1000)
//             }).start()
//         }
//     }
// })

new Thread(() => {
    while (isPlaying) {
        if (Player.getHeldItem().getName().includes("Bonemerang")) {
            if (f11Bone) {
                RightClick.invoke(Client.getMinecraft())
                Thread.sleep(900)
            }
        }
    }
}).start()

register("GuiOpened", () => {
    if (!macros.guiCheck)
        return;
    if (f11Bone) {
        f11Bone = false;
        ChatLib.chat(PREFIX + "&rF11 Bonemerang &cDisabled&r")
    }
})

const termToggle = new KeyBind("Terminator Swap", Keyboard.KEY_NONE, ADVANCE_PREFIX)
const shortBows = [
    "terminator",
    "juju shortbow",
    "artisanal shortbow"
]
let termSwap = false;

register("tick", () => {
    if (macros.termSwap === 0) {
        if (termToggle.isPressed()) {
            ChatLib.chat(`
                $ {
                    (termSwap = !termSwap) ? PREFIX + '&rTerminator Swap &aEnabled': PREFIX + '&rTerminator Swap &cDisabled'
                }
                `);
        }
    }
});

register("tick", () => {
    if (macros.termSwap === 0) {
        if (termSwap) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < shortBows.length; j++) {
                    if (Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes(shortBows[j])) {
                        Client.sendPacket(new C09PacketHeldItemChange(i))
                        Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0))
                        Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c))
                        break;
                    }
                }
            }
        }
    } else if (macros.termSwap === 1) {
        if (termToggle.isKeyDown()) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < shortBows.length; j++) {
                    if (Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes(shortBows[j])) {
                        Client.sendPacket(new C09PacketHeldItemChange(i))
                        Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0))
                        Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c))
                        break;
                    }
                }
            }
        }
    }
})

register("GuiOpened", () => {
    if (macros.guiCheck === true) {
        if (termSwap) {
            termSwap = false;
            ChatLib.chat(PREFIX + "&rTerminator Swap &cDisabled&r")
        }
    }
})

const doubleSwap = new KeyBind("Double Swap Macro", Keyboard.KEY_NONE, ADVANCE_PREFIX);
let doubleSwapToggle = false;

register("tick", () => {
    if (doubleSwap.isPressed()) {
        ChatLib.chat(`
                $ {
                    (doubleSwapToggle = !doubleSwapToggle) ? PREFIX + '&rDouble Swap &aEnabled': PREFIX + '&rDouble Swap &cDisabled'
                }
                `);
    }
});

let swap_time = new Date().getTime();
register("clicked", () => {
    if (!doubleSwapToggle)
        return;
    new Thread(() => {
        let slot1;
        let slot2;
        let ogSlot;
        Player.getOpenedInventory().getItems().slice(36, 45).forEach((item, index) => {
            if (item.getName().includes(macros.doubleSwapSlot1)) {
                slot1 = index;
            }
            if (item.getName().includes(macros.doubleSwapSlot2)) {
                slot2 = index;
            }
            if (item.getName().includes(macros.swapMacroName)) {
                ogSlot = index;
            }
        })
        if (new Date().getTime() - swap_time > 500) {
            if (macros.swapType === 1) {
                if (doubleSwapToggle) {
                    if (Player.getHeldItem().getName().includes(macros.swapMacroName)) {
                        new Thread(() => {
                            Thread.sleep(75);
                            Player.setHeldItemIndex(slot1);
                            RightClick.invoke(Client.getMinecraft());
                            Player.setHeldItemIndex(slot2);
                            RightClick.invoke(Client.getMinecraft());
                            Player.setHeldItemIndex(ogSlot);
                            swap_time = new Date().getTime();
                        }).start();
                    }
                }
            } else if (macros.swapType === 0) {
                register("step", function() {
                    new Thread(() => {
                        if (doubleSwapToggle) {
                            checkHotbarSlots();
                            try {
                                Thread.sleep(250);
                                Player.setHeldItemIndex(ogSlot);
                                Player.setHeldItemIndex(slot1);
                                RightClick.invoke(Client.getMinecraft());
                                Player.setHeldItemIndex(slot2);
                                RightClick.invoke(Client.getMinecraft());
                                Player.setHeldItemIndex(ogSlot);
                            } catch (e) {}
                        }
                    }).start();
                }).setFps(2);
            }
        }
    }).start()
});

register("GuiOpened", () => {
    if (macros.guiCheck === true) {
        if (doubleSwapToggle) {
            doubleSwapToggle = false;
            ChatLib.chat(PREFIX + "&rDouble Swap &cDisabled&r")
        }
    }
})

const tripleSwap = new KeyBind("Triple Swap Macro", Keyboard.KEY_NONE, ADVANCE_PREFIX);
let tripleSwapToggle = false;
register("tick", () => {
    if (tripleSwap.isPressed()) {
        ChatLib.chat(`
                $ {
                    (tripleSwapToggle = !tripleSwapToggle) ? PREFIX + '&rTriple Swap &aEnabled': PREFIX + '&rTriple Swap &cDisabled'
                }
                `);
    }
});
let swaptime = new Date().getTime();

register("clicked", () => {
    if (!tripleSwapToggle)
        return;
    new Thread(() => {
        let itemSlot1;
        let itemSlot2;
        let itemSlot3;
        let originalSlot;
        Player.getOpenedInventory().getItems().slice(36, 45).forEach((item, index) => {
            if (item.getName().includes(macros.tripleSwapSlot1)) {
                itemSlot1 = index;
            }
            if (item.getName().includes(macros.tripleSwapSlot2)) {
                itemSlot2 = index;
            }
            if (item.getName().includes(macros.tripleSwapSlot3)) {
                itemSlot3 = index;
            }
            if (item.getName().includes(macros.macroswapName)) {
                originalSlot = index;
            }
        })
        if (new Date().getTime() - swaptime > 500) {
            if (macros.typeOfSwap === 1) {
                if (tripleSwapToggle) {
                    if (Player.getHeldItem().getName().includes(macros.macroswapName)) {
                        new Thread(() => {
                            Thread.sleep(75);
                            Player.setHeldItemIndex(itemSlot1);
                            RightClick.invoke(Client.getMinecraft());
                            Player.setHeldItemIndex(itemSlot2);
                            RightClick.invoke(Client.getMinecraft());
                            Player.setHeldItemIndex(itemSlot3);
                            RightClick.invoke(Client.getMinecraft());
                            Player.setHeldItemIndex(originalSlot);
                            swap_time = new Date().getTime();
                        }).start();
                    }
                }
            } else if (macros.typeOfSwap === 0) {
                register("step", function() {
                    new Thread(() => {
                        if (tripleSwapToggle) {
                            checkHotbarSlots();
                            try {
                                Thread.sleep(250);
                                Player.setHeldItemIndex(originalSlot);
                                Player.setHeldItemIndex(itemSlot1);
                                RightClick.invoke(Client.getMinecraft());
                                Player.setHeldItemIndex(itemSlot2);
                                RightClick.invoke(Client.getMinecraft());
                                Player.setHeldItemIndex(itemSlot3);
                                RightClick.invoke(Client.getMinecraft());
                                Player.setHeldItemIndex(originalSlot);
                            } catch (e) {}
                        }
                    }).start();
                }).setFps(2);
            }
        }
    }).start()
});

register("GuiOpened", () => {
    if (macros.guiCheck === true) {
        if (tripleSwapToggle) {
            tripleSwapToggle = false;
            ChatLib.chat(PREFIX + "&rTriple Swap &cDisabled&r")
        }
    }
})

let KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
let ToggleSprint = new KeyBind("Toggle Sprint", Keyboard.KEY_NONE, BIND_PREFIX);
let sprinting = false;
let sprintKey = Client.getMinecraft().field_71474_y.field_151444_V.func_151463_i();

register("tick", () => {
    if (ToggleSprint.isPressed()) {
        sprinting = !sprinting;
        if (!sprinting) {
            if (sprintKey > 0) {
                KeyBinding.func_74510_a(sprintKey, Keyboard.isKeyDown(sprintKey));
            }
        }
    }
    if (sprinting) {
        KeyBinding.func_74510_a(sprintKey, true);
    }
})
register("renderOverlay", () => {
    if (!macros.toggleSprintRender) return;
    if (!sprinting) return;
    Renderer.drawString("[Sprinting Toggled]", Renderer.screen.getWidth() - Renderer.getStringWidth("[Sprinting Toggled]"), Renderer.screen.getHeight() - Client.getMinecraft().field_71466_p.field_78288_b);
})

let inCatacombs = false;

register("tick", () => {
    Scoreboard.getLines().forEach(line => {
        line = ChatLib.removeFormatting(line.toString());
        if (line.includes("The Catac")) {
            inCatacombs = true;
        }
    });
})

register("postGuiRender", () => {
    if (dungeons.autoCloseSecretChests) {
        let inv = Player.getOpenedInventory().getName()
        if (inCatacombs && inv.includes("Chest") && !inv.includes("Wood" || "Gold" || "Diamond" || "Emerald" || "Obsidian" || "Bedrock")) {
            Client.currentGui.close()
        }
    }
})

let inCH = false;

register("tick", () => {
    Scoreboard.getLines().forEach(line => {
        line = ChatLib.removeFormatting(line.toString());
        if (
            line.includes("precursor") ||
            line.includes("jungle") ||
            line.includes("goblin") ||
            line.includes("mithril") ||
            line.includes("magma") ||
            line.includes("mines of divan") ||
            line.includes("khazad") ||
            line.includes("magma") ||
            line.includes("cata") ||
            line.includes("lair") ||
            line.includes("crystal") ||
            line.includes("grotto")
        ) {
            inCH = true;
        }
    });
})

register("postGuiRender", () => {
    if (config.autoCloseCHChests) {
        if (inCH) {
            if (Player.getOpenedInventory().getName().includes("Treasure Chest")) {
                Client.currentGui.close()
            }
        }
    }
})

register("worldLoad", function() {
    inCatacombs = false;
    inCH = false;
})

var pelttimer = -1;
register("chat", () => {
    pelttimer = 60;
}).setChatCriteria("&e[NPC] Trevor The Trapper&f: &rYou can find your${*}");

register("chat", (e) => {
    if (!config.autoAcceptTrapper) return;
    let yesmsg = new Message(EventLib.getMessage(e));
    yesmsg.getMessageParts().forEach((part) => {
        if (ChatLib.removeFormatting(part.getText()) == "[YES]") {
            ChatLib.say(part.getClickValue());
        }
    });
}).setChatCriteria("\n&r&b&lAccept the trappers task to hunt the animal?&r\n&r&7Click an option: &r&a&l[YES]&r&7 - &r&c&l[NO]&r");

register("step", () => {
    if (!config.trapperCooldown) return;
    if (pelttimer > 0) {
        pelttimer--;
    } else if (pelttimer == 0) {
        pelttimer = -1;
        //  ChatLib.chat("&a---------------------------------");
        ChatLib.chat(PREFIX + "Trapper is ready for a new quest!");
        //  ChatLib.chat("&a---------------------------------");
    }
}).setDelay(1);

// new Thread(() => {
//     while (isPlaying) {
//         Thread.sleep(50)
//         if (!macros.peltESP) return;
//         World.getAllEntities().forEach(entity => {
//             if (entity.getClassName() === "EntityCow" || "EntityRabbit" || "EntitySheep" || "EntityPig" || "EntityChicken") {
//                 entity.getEntity().func_82142_c(false)
//             }
//         })
//     }
// }).start()

// const rabHatSwap = new KeyBind("Rab Hat Swap", Keyboard.KEY_NONE, GUI_PREFIX)
// let inInv = false;
// let swapped = false;
// register("tick", () => {
//     if (rabHatSwap.isPressed()) {
//         ChatLib.chat(PREFIX + "Equipping Rabbit Hat")
//         openInventory()
//         swapped = false;
//         inInv = true;
//     }
// })
// register("postGuiRender", () => {
//     if (inInv) {
//         for (let i = 0; i < 44; i++) {
//             let inv = Player.getOpenedInventory()
//             let item = inv.getStackInSlot(i)
//             if (item.getName().includes("Rabbit Hat")) {
//                 if (swapped) return;
//                 //  inv.drag("LEFT", 5, 9)
//                 inv.click(5, true, "LEFT")
//                 inv.click(i, true, "LEFT")
//                     //  Client.currentGui.close()
//                 swapped = true;
//             }
//         }
//         //   Client.currentGui.close()
//     }
// })

// register("command", () => {
//     Player.getOpenedInventory().getItems().forEach((item, index) => {
//         if (item.getName().toLowerCase().includes("rabbit hat")) {
//             console.log(index);
//         }
//     })
// }).setName("rabhatshits")

register("chat", () => {
    if (!config.reportBoih) return;
    new Thread(() => {
        ChatLib.command("wdr Boih")
        register("chat", (events) => {
            cancel(events)
            ChatLib.chat(PREFIX + "Reported Boih")
        }).setChatCriteria("&aThanks for your Cheating report. We understand your concerns and it will be reviewed as soon as possible.&r")
    }).start()

}).setChatCriteria("&r&eWelcome to &r&aHypixel SkyBlock&r&e!&r")
ChatLib.chat(PREFIX + "Client Loaded");