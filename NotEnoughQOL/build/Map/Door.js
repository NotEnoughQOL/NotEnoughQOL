const Color = Java.type('java.awt.Color');

class Door {

    constructor(first, second, type) {
        this(first, second, type, null, null)
    }

    constructor(first, second, type, blockX, blockZ) {
        this.first = first;
        this.second = second;
        this.type = type;
        this.blockX = blockX;
        this.blockZ = blockZ;
        this.horizontal = (this.first[0] - this.second[0]) !== 0
        this.marked = false;
    }

    updateDoorType = () => {
        if (this.blockZ && this.blockX)
            this.type = Door.getDoorType(World.getBlockAt(this.blockX, 72, this.blockZ).getID());
    }

    getColor = () => {
        if (this.marked) return Door.color(255, 0, 0);
        switch (this.type) {
            case 'BLOOD': return Door.color(255, 0, 0);
            case 'WITHER': return Door.color(0, 0, 0);
            default: return Door.color(114, 67, 27);
        }
    }

    static getDoorType = (id) => {
        switch (id) {
            case 173: return 'WITHER';
            case 159: return 'BLOOD';
            default: return 'NORMAL';
        }
    }

    static color = (r, g, b) => {
        return new Color(r / 255, g / 255, b / 255);
    }
}


export default Door;