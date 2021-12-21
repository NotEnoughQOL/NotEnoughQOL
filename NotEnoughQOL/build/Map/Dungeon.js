import Room from './Room.js';
import Door from './Door.js';

class Dungeon {

    constructor(floor, settings) {
        this.settings = settings;
        this.roomList = [];
        this.doorList = [];
        this.roomLookupMap = {};

        this.totalItemPickupCount = 0;
        this.totalSecretCount = 0;
        this.totalCryptCount = 0;
        this.totalRoomCount = 0;
        this.floor = floor;
        this.puzzleNames = [];
        this.players = {};
        this.started = false;

        this.foundMimic = false;
        this.mimicDeath = false;

        let [roomsCoordinates, connectionCoordinates, doorCoordinates] = getRoomCoordinateList();
        roomsCoordinates.forEach((roomCoords) => {
            let x = String(roomCoords[0]);
            let y = String(roomCoords[1]);
            let hash = Room.findRoomHash(roomCoords[0], roomCoords[1]);
            let roomData = Room.findRoomInRoomList(hash);
            if (!roomData) { return };
            if (!this.roomLookupMap[x]) this.roomLookupMap[x] = {};
            let room = new Room(roomData, roomCoords, settings);
            this.roomLookupMap[x][y] = room;
        });

        connectionCoordinates.forEach((connectionCoordinates) => {
            let firstRoomCoordinates = connectionCoordinates[0];
            let secondRoomCoordinates = connectionCoordinates[1];
            let firstRoom = this.roomLookupMap[String(firstRoomCoordinates[0])][String(firstRoomCoordinates[1])];
            let secondRoom = this.roomLookupMap[String(secondRoomCoordinates[0])][String(secondRoomCoordinates[1])];
            if (!firstRoom || !secondRoom) return;
            //ignore delete rooms
            if (firstRoom.type === 'delete' || secondRoom.type === 'delete') return;
            //spawn is bigger than room size, add door instead of connection
            if ((firstRoom.type === 'spawn' || secondRoom.type === 'spawn') && firstRoom.type !== secondRoom.type) {
                this.doorList.push(new Door(firstRoomCoordinates, secondRoomCoordinates, 'NORMAL'));
                return;
            }
            //dont combine two different identified rooms
            if (firstRoom.name !== 'Unknown' && secondRoom.name !== 'Unknown' && firstRoom.name !== secondRoom.name) return;
            //combine room info of 2 rooms
            if (firstRoom.type === 'unknown' || secondRoom.type === 'unknown' || firstRoom.name === secondRoom.name) {
                firstRoom.addInfo(secondRoom);
                this.roomLookupMap[String(secondRoomCoordinates[0])][String(secondRoomCoordinates[1])] = firstRoom;
            }
        });

        doorCoordinates.forEach((door) => {
            this.doorList.push(new Door(...door))
        });
        //count wither doors (fairy room door opens on dungeon start)
        this.witherDoors = this.doorList.filter((door) => door.type === 'WITHER').length - 1;
        Scoreboard.getLines().forEach(line => {
            if (line.toString().includes('Time')) this.witherDoors++;
        })

        //add all rooms from the lookup map to the room list
        Object.values(this.roomLookupMap).forEach((row) => Object.values(row).forEach((room) => {
            if (room.listed) return;
            room.listed = true;
            if (room.type === 'delete') return;
            this.roomList.push(room);

            this.totalSecretCount += parseInt(room.secrets);
            this.totalCryptCount += parseInt(room.crypts);
            this.totalItemPickupCount += parseInt(room.items);

            if (room.type === 'puzzle') this.puzzleNames.push(room.name);
            this.totalRoomCount += room.coords.length;
        }));
        this.width = Math.max(...this.roomList.map((room) => Math.max(...room.coords.map((coords) => coords[0])))) + 1;
        this.height = Math.max(...this.roomList.map((room) => Math.max(...room.coords.map((coords) => coords[1])))) + 1;
        this.size = Math.max(this.width, this.height);
    }

    findTrappedChests = () => {
        if (this.foundMimic || !this.started) return false;
        if (this.floor < 6) {
            this.foundMimic = true;
            return false;
        }
        const TileEntityChest = Java.type('net.minecraft.tileentity.TileEntityChest')
        World.getWorld().field_147482_g.forEach((entity) => {
            //check if trapped chest
            if (entity instanceof TileEntityChest && entity.func_145980_j() === 1) {
                let x = ~~(entity.func_174877_v().func_177958_n() / 32);
                let y = ~~(entity.func_174877_v().func_177952_p() / 32);
                if (x in this.roomLookupMap && y in this.roomLookupMap[x] && !this.roomLookupMap[x][y].mimics.includes(entity)) {
                    this.roomLookupMap[x][y].mimics.push(entity);
                    if (this.roomLookupMap[x][y].hasMimic()) {
                        this.foundMimic = true;
                        return true;
                    }
                }
            }
        });
        return false;
    }

    getClearedRooms = () => {
        return this.roomList.reduce((prev, room) => prev + room.getCleared(), 0);
    }
}


getRoomCoordinateList = () => {
    let doors = []
    let rooms = []
    let roomConnections = []

    //start with first room
    let currentRooms = [[~~(Player.getX() / (Room.size + 1)), ~~(Player.getZ() / (Room.size + 1))]]
    isRoomAlreadyExplored = (newRoom) => {
        for (let room of rooms) {
            if (room[0] === newRoom[0] && room[1] === newRoom[1]) return true;
        }
        for (let room of rooms) {
            if (room[0] === newRoom[0] && room[1] === newRoom[1]) return true;
        }
        return false;
    }
    let failsave = 65;
    while (currentRooms.length) {
        if (!failsave) break;
        failsave--;
        //check if room is connected to neighbors or has a door 
        let currentRoom = currentRooms.pop()
        rooms.push(currentRoom)
        let x = currentRoom[0] * (Room.size + 1);
        let z = currentRoom[1] * (Room.size + 1);
        //north connection or door
        if (World.getBlockAt(x, 72, z - 1).getID() !== 0 || World.getBlockAt(x + Room.size - 1, 72, z - 1).getID() !== 0) {
            let newRoom = [currentRoom[0], currentRoom[1] - 1];
            if (!isRoomAlreadyExplored(newRoom)) {
                currentRooms.push(newRoom)
                roomConnections.push([currentRoom, newRoom])
            }
        } else if (World.getBlockAt(x + 13, 72, z - 1).getID() !== 0) {
            let type = Door.getDoorType(World.getBlockAt(x + 15, 72, z - 1).getID());
            let newRoom = [currentRoom[0], currentRoom[1] - 1];
            if (!isRoomAlreadyExplored(newRoom)) {
                currentRooms.push(newRoom)
                doors.push([currentRoom, newRoom, type, x + 15, z - 1])
            }
        }
        //south connection or door
        if (World.getBlockAt(x, 72, z + Room.size).getID() !== 0 || World.getBlockAt(x + Room.size - 1, 72, z + Room.size).getID() !== 0) {
            let newRoom = [currentRoom[0], currentRoom[1] + 1];
            if (!isRoomAlreadyExplored(newRoom)) {
                currentRooms.push(newRoom)
                roomConnections.push([currentRoom, newRoom])
            }
        } else if (World.getBlockAt(x + 13, 72, z + Room.size).getID() !== 0) {
            let type = Door.getDoorType(World.getBlockAt(x + 15, 72, z + Room.size).getID());
            let newRoom = [currentRoom[0], currentRoom[1] + 1];
            if (!isRoomAlreadyExplored(newRoom)) {
                currentRooms.push(newRoom)
                doors.push([currentRoom, newRoom, type, x + 15, z + Room.size])
            }
        }
        //east connection or door
        if (World.getBlockAt(x + Room.size, 72, z).getID() !== 0 || World.getBlockAt(x + Room.size, 72, z + Room.size - 1).getID() !== 0) {
            let newRoom = [currentRoom[0] + 1, currentRoom[1]];
            if (!isRoomAlreadyExplored(newRoom)) {
                currentRooms.push(newRoom)
                roomConnections.push([currentRoom, newRoom])
            }
        } else if (World.getBlockAt(x + Room.size, 72, z + 13).getID() !== 0) {
            let type = Door.getDoorType(World.getBlockAt(x + Room.size, 72, z + 15).getID());
            let newRoom = [currentRoom[0] + 1, currentRoom[1]];
            if (!isRoomAlreadyExplored(newRoom)) {
                currentRooms.push(newRoom)
                doors.push([currentRoom, newRoom, type, x + Room.size, z + 15])
            }
        }
        //west connection or door
        if (World.getBlockAt(x - 1, 72, z).getID() !== 0 || World.getBlockAt(x - 1, 72, z + Room.size - 1).getID() !== 0) {
            let newRoom = [currentRoom[0] - 1, currentRoom[1]];
            if (!isRoomAlreadyExplored(newRoom)) {
                currentRooms.push(newRoom)
                roomConnections.push([currentRoom, newRoom])
            }
        } else if (World.getBlockAt(x - 1, 72, z + 13).getID() !== 0) {
            let type = Door.getDoorType(World.getBlockAt(x - 1, 72, z + 15).getID());
            let newRoom = [currentRoom[0] - 1, currentRoom[1]];
            if (!isRoomAlreadyExplored(newRoom)) {
                currentRooms.push(newRoom)
                doors.push([currentRoom, newRoom, type, x - 1, z + 15])
            }
        }
    }
    return [rooms, roomConnections, doors];
}

export default Dungeon;