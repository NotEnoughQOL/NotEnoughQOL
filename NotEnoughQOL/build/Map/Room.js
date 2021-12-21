const Rect = Java.type('java.awt.Rectangle');
const Area = Java.type('java.awt.geom.Area');
const Color = Java.type('java.awt.Color');
const JavaString = Java.type('java.lang.String');

const blacklisted_ids = [17, 162, 163, 135, 164, 136, 53, 134, 109, 44, 98, 397, 69, 101, 389, 77];
var Rooms = JSON.parse(FileLib.read("NotEnoughRacism", "build/Map/rooms.json"));

//remove later
let roomPixel = 60
let roomPixelGap = roomPixel / 5;
let borderPixel = roomPixel / 10;
let fontSize = 32;


class Room {

    static size = 31;

    constructor(data, coords, settings) {
        this.type = data.type;
        this.coords = [coords];
        this.name = data.name;
        this.secrets = data.secrets;
        this.soul = data.soul;
        this.collected_secrets = 0;
        this.crypts = data.crypts;
        this.wither_essences = (this.secrets === 0) ? 0 : data.secret_details.wither;
        this.chests = (this.secrets === 0) ? 0 : data.secret_details.chest;
        this.bats = (this.secrets === 0) ? 0 : data.secret_details.bat;
        this.items = (this.secrets === 0) ? 0 : data.secret_details.item;
        this.redstone_key = (this.secrets === 0) ? 0 : data.secret_details.redstone_key;
        this.cleared = 0;
        this.listed = false;
        this.settings = settings;
        this.journals = data.journals;
        this.reviveStones = data.revive_stones;
        this.spiders = data.spiders;
        this.marked = false;
        this.trapped_chests = data.trapped_chests;
        this.mimics = [];
        this.createTooltipText();
        this.times = {};
    }

    createTooltipText() {
        this.nameTooltip = new Text('§9§l' + this.name + '§r')
        this.secretTooltip = [new Text('§6Secrets: §r' + this.secrets)]
        if (this.chests > 0) this.secretTooltip.push(new Text('  ' + this.chests + ' §eChest' + (this.chests === 1 ? '' : 's') + '§r'))
        if (this.items > 0) this.secretTooltip.push(new Text('  ' + this.items + ' §4Item Pickup' + (this.items === 1 ? '' : 's') + '§r'))
        if (this.wither_essences > 0) this.secretTooltip.push(new Text('  ' + this.wither_essences + ' §0Wither Essence' + (this.wither_essences === 1 ? '' : 's') + '§r'))
        if (this.bats > 0) this.secretTooltip.push(new Text('  ' + this.bats + ' §dBat' + (this.bats === 1 ? '' : 's') + '§r'))
        if (this.redstone_key > 0) this.secretTooltip.push(new Text('  ' + this.redstone_key + ' §cRedstone Key' + (this.redstone_key === 1 ? '' : 's') + '§r'))
        this.cryptTooltip = new Text('§7Crypts: §r' + this.crypts + (this.reviveStones ? ' §a(' + this.reviveStones + ')' : '') + '§r');
        this.soulTooltip = new Text('§d§l§kOO§r §d§lFAIRY SOUL §kOO§r');
        this.spiderTooltip = new Text('§7Cellar Spiders');
        this.journalTooltip = new Text('§9Journals: §r' + this.journals);
    }

    addInfo(room) {
        if (this.type === 'unknown') {
            this.type = room.type;
            this.name = room.name;
            this.secrets = room.secrets;
            this.soul = room.soul;
            this.wither_essences = room.wither_essences;
            this.chests = room.chests;
            this.bats = room.bats;
            this.items = room.items;
            this.redstone_key = room.redstone_key
            this.crypts = room.crypts;
            this.rating = room.rating;
            this.cleared = room.cleared;
            this.reviveStones = room.reviveStones;
            this.spiders = room.spiders;
            this.journals = room.journals;
            this.trapped_chests = room.trapped_chests;
            this.mimics = room.mimics;
            this.createTooltipText();
        }
        if (this.coords.length < 4 && room.coords.length < 4) this.coords.push(...room.coords);
    }

    hasMimic() {
        return this.mimics.length > this.trapped_chests;
    }

    getMimicCoordinates() {
        if (!this.hasMimic()) return [0, 0];
        if (!this.mimics || !this.mimics[0]) return [0, 0];
        let coords = this.mimics[0].func_174877_v();
        return [coords.func_177958_n(), coords.func_177952_p()];
    }

    addCoords(coords) {
        if (!this.hasCoords(coords)) {
            this.coords.push(coords);
        }
    }

    hasCoords(coords) {
        for (let coordinates of this.coords) {
            if (coordinates[0] === coords[0] && coordinates[1] === coords[1]) return true;
        }
        return false;
    }

    getDisplayText(score, exactScore) {
        if (this.type === 'spawn' || this.type === 'fairy') return '';
        if (this.type === 'blood') {
            if (this.cleared < 1) return '?';
            if (!this.settings.showScore) return '';
            if (this.settings.exactScore) return '' + exactScore;
            else return '' + score;
        }

        return (this.cleared ? (this.secrets ? `${this.collected_secrets}/${this.secrets}` : '0') : this.secrets);
    }

    getRoomMapCoords() {

        let min_x = Math.min(...this.coords.map((arr) => arr[0]));
        let min_z = Math.min(...this.coords.map((arr) => arr[1]));

        if (!this.hasCoords([min_x, min_z]))
            min_z++;

        return [min_x, min_z];
    }

    drawDisplayText(graphics, score, exactScore) {
        let coords = this.getRoomMapCoords();
        let text = this.getDisplayText(score, exactScore);
        let width = graphics.getFontMetrics().stringWidth(text);
        let x = coords[0] * (roomPixel + roomPixelGap) + (roomPixel - width) / 2
        let y = coords[1] * (roomPixelGap + roomPixel) + roomPixel - (roomPixel + roomPixelGap - fontSize) / 2;
        switch (this.cleared) {
            case 2:
                graphics.setColor(Room.color(220, 220, 220));
                break;
            case 3:
                graphics.setColor(Room.color(0, 123, 0));
                break;
            default:
                graphics.setColor(Room.color(0, 0, 0));
        }
        graphics.drawString(text, x, y);

    }


    getInfoTooltip() {
        let result = [this.nameTooltip];
        if (this.settings.spiders && this.spiders)
            result.push(this.spiderTooltip);
        if (this.settings.secretDetails)
            result = result.concat(this.secretTooltip);
        if (this.settings.crypts && (this.crypts + this.reviveStones))
            result.push(this.cryptTooltip);
        if (this.settings.journals && this.journals)
            result.push(this.journalTooltip);
        if (this.settings.fairySouls && this.soul)
            result.push(this.soulTooltip);
        return result;
    }

    getCleared() {
        if (this.type === 'blood' || this.cleared > 1)
            return this.coords.length;
        return 0;
    }

    getMapShapes() {
        //easy case if not L room:
        let min_x = Math.min(...this.coords.map((arr) => arr[0]));
        let max_x = Math.max(...this.coords.map((arr) => arr[0]));
        let min_z = Math.min(...this.coords.map((arr) => arr[1]));
        let max_z = Math.max(...this.coords.map((arr) => arr[1]));
        let width = (max_x - min_x + 1) * roomPixel + (max_x - min_x) * roomPixelGap;
        let height = (max_z - min_z + 1) * roomPixel + (max_z - min_z) * roomPixelGap;

        if (this.coords.length !== 3 || max_x - min_x >= 2 || max_z - min_z >= 2) {
            return [new Rect((roomPixel + roomPixelGap) * min_x, (roomPixel + roomPixelGap) * min_z, width, height), new Rect((roomPixel + roomPixelGap) * min_x + borderPixel, (roomPixel + roomPixelGap) * min_z + borderPixel, width - 2 * borderPixel, height - 2 * borderPixel)];
        } else {
            //cases cause i cant be bothered to figure out a general formula
            let middle_x = (this.coords.map((arr) => arr[0])).sort()[1]
            let middle_z = (this.coords.map((arr) => arr[1])).sort()[1]
            let other_x = this.coords.map((arr) => arr[0]).filter((val) => val !== middle_x)[0]
            let other_z = this.coords.map((arr) => arr[1]).filter((val) => val !== middle_z)[0]
            let x_offset = Math.min(other_x, middle_x) * (roomPixel + roomPixelGap);
            let z_offset = Math.min(other_z, middle_z) * (roomPixel + roomPixelGap);
            if (middle_x < other_x) {
                if (middle_z < other_z) {
                    //corner top left
                    let area = new Area(new Rect(x_offset, z_offset, 2 * roomPixel + roomPixelGap, roomPixel));
                    area.add(new Area(new Rect(x_offset, z_offset + roomPixel, roomPixel, roomPixel + roomPixelGap)));
                    let innerArea = new Area(new Rect(x_offset + borderPixel, z_offset + borderPixel, 2 * roomPixel - 2 * borderPixel + roomPixelGap, roomPixel - borderPixel * 2));
                    innerArea.add(new Area(new Rect(x_offset + borderPixel, z_offset + roomPixel - borderPixel, roomPixel - 2 * borderPixel, roomPixel + roomPixelGap)));
                    return [area, innerArea];
                } else {
                    //corner bottom left
                    let area = new Area(new Rect(x_offset, z_offset + roomPixelGap + roomPixel, 2 * roomPixel + roomPixelGap, roomPixel));
                    area.add(new Area(new Rect(x_offset, z_offset, roomPixel, roomPixel + roomPixelGap)));
                    let innerArea = new Area(new Rect(x_offset + borderPixel, z_offset + roomPixelGap + roomPixel + borderPixel, 2 * roomPixel + roomPixelGap - 2 * borderPixel, roomPixel - 2 * borderPixel));
                    innerArea.add(new Area(new Rect(x_offset + borderPixel, z_offset + borderPixel, roomPixel - 2 * borderPixel, roomPixel + roomPixelGap)));
                    return [area, innerArea];
                }
            } else {
                if (middle_z < other_z) {
                    //corner top right
                    let area = new Area(new Rect(x_offset, z_offset, 2 * roomPixel + roomPixelGap, roomPixel));
                    area.add(new Area(new Rect(x_offset + roomPixel + roomPixelGap, z_offset + roomPixel, roomPixel, roomPixel + roomPixelGap)));
                    let innerArea = new Area(new Rect(x_offset + borderPixel, z_offset + borderPixel, 2 * roomPixel + roomPixelGap - 2 * borderPixel, roomPixel - 2 * borderPixel));
                    innerArea.add(new Area(new Rect(x_offset + roomPixel + roomPixelGap + borderPixel, z_offset + roomPixel - borderPixel, roomPixel - 2 * borderPixel, roomPixel + roomPixelGap)));
                    return [area, innerArea];

                } else {
                    //corner bottom right
                    let area = new Area(new Rect(x_offset, z_offset + roomPixelGap + roomPixel, 2 * roomPixel + roomPixelGap, roomPixel));
                    area.add(new Area(new Rect(x_offset + roomPixel + roomPixelGap, z_offset, roomPixel, roomPixel + roomPixelGap)));
                    let innerArea = new Area(new Rect(x_offset + borderPixel, z_offset + roomPixelGap + roomPixel + borderPixel, 2 * roomPixel + roomPixelGap - 2 * borderPixel, roomPixel - 2 * borderPixel));
                    innerArea.add(new Area(new Rect(x_offset + roomPixel + roomPixelGap + borderPixel, z_offset + borderPixel, roomPixel - 2 * borderPixel, roomPixel + roomPixelGap)));
                    return [area, innerArea];
                }
            }
        }
    }

    getRoomColor = () => {
        switch (this.type) {
            case 'fairy':
                return Room.color(239, 126, 163);
            case 'blood':
                return Room.color(255, 0, 0);
            case 'delete':
                return Room.color(255, 0, 0);
            case 'trap':
                return Room.color(213, 126, 50);
            case 'puzzle':
                return Room.color(176, 75, 213);
            case 'mobs':
                return Room.color(114, 67, 27);
            case 'spawn':
                return Room.color(0, 123, 0);
            case 'gold':
                return Room.color(226, 226, 50);
            case 'miniboss':
                return Room.color(85, 51, 19);
            case 'rare':
                return Room.color(175, 122, 87);
            default:
                return Room.color(64, 64, 64);
        }
    }

    getColorCode = () => {
        switch (this.type) {
            case 'fairy':
                return '§d';
            case 'blood':
                return '§c';
            case 'delete':
                return '§c';
            case 'trap':
                return '§6';
            case 'puzzle':
                return '§5';
            case 'mobs':
                return '§b';
            case 'spawn':
                return '§a';
            case 'gold':
                return '§e';
            case 'miniboss':
                return '§5';
            case 'rare':
                return '§1';
            default:
                return '§8';;
        }
    }

    static findRoomHash = (xCoord, zCoord) => {
        let x = xCoord * (Room.size + 1);
        let z = zCoord * (Room.size + 1);
        let roomIds = []
        let roomHashes = []
        for (let i = 0; i < Room.size - 4; i++) {
            roomIds.push([])
            for (let j = 0; j < Room.size - 4; j++) {
                let currentId = World.getBlockAt(x + i + 2, 72, z + j + 2).getID();
                if (blacklisted_ids.includes(currentId))
                    currentId = 0;
                roomIds[i].push(currentId);
            }
        }
        let roomStrings = ['', '', '', ''];
        let size = roomIds.length;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {

                roomStrings[0] += roomIds[i][j];
                roomStrings[1] += roomIds[size - i - 1][size - j - 1];
                roomStrings[2] += roomIds[j][size - i - 1];
                roomStrings[3] += roomIds[size - j - 1][i]
            }
        }
        roomStrings.forEach((s) => roomHashes.push(new JavaString(s).hashCode()));
        return Math.max(...roomHashes);
    }

    static getRooms = () => {
        return Rooms;
    }

    static findRoomInRoomList = (id) => {
        for (let room of Rooms) {
            if (room.hash.includes(id)) return room;
        }
        return { "hash": [], "name": "Unknown", "type": "unknown", "secrets": 0, "soul": false, "crypts": 0, "secret_details": { "chest": 0, "wither": 0, "bat": 0, "item": 0 }, "rating": 0, "reviveStones": 0, "spiders": false, "journals": 0, "trapped_chests": 5 }
    }


    static color = (r, g, b) => {
        return new Color(r / 255, g / 255, b / 255);
    }

}


export default Room;