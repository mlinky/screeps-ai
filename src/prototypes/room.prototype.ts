export {}

declare global {
    interface Room {
        sources:Source[];
        spawns:StructureSpawn[];
        availableSpawn:StructureSpawn;
        creepsNeeded:CreepRequest[];
        canSpawn():boolean;
        requestCreep(requestRoom:string, requestRole:string):void;
        spawnCreep():void;
    }


}

Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
        // If we dont have the value stored locally
        if (!this._sources) {
            // Get the sources objects from the id's in memory and store them locally
            this._sources = this.find(FIND_SOURCES);
        }
        return this._sources;
    },

    enumerable: false,
    configurable: true

});

Object.defineProperty(Room.prototype, 'spawns', {
    get: function() {
        // If we dont have the value stored locally
        if (!this._spawns) {
            // Get the spawns objects from the id's in memory and store them locally
            this._spawns = this.find(FIND_MY_SPAWNS);
        }
        return this._spawns;
    },

    enumerable: false,
    configurable: true

});

Object.defineProperty(Room.prototype, 'availableSpawn', {
    get: function():StructureSpawn|undefined {
        for (let spawn of this.spawns) {
            if (!spawn.spawning) {
                return spawn;
            }
        }
        return;
    },

    enumerable: false,
    configurable: true

});

Room.prototype.requestCreep = function(requestRoom:string, requestRole:string):void {

    if (_.isUndefined(this.creepsNeeded)) {
        this.creepsNeeded = [];
    }

    this.creepsNeeded.push(new CreepRequest(requestRoom, requestRole));

};

Room.prototype.canSpawn = function():boolean {

    for (let spawn of this.spawns) {
        if (!spawn.spawning) {
            return true;
        }
    }

    return false;

};

Room.prototype.spawnCreep = function():void {

    if (!this.canSpawn()) {
        return;
    }

    let r:CreepRequest|undefined = _.find(this.creepsNeeded, function (o:CreepRequest) { return o.creepRole === 'miner'; });
    if (r != null) {
        r.actionRequest(this);
        return;
    }

};

/////

class CreepRequest {

    roomName:string;
    creepRole:string;

    constructor (roomName:string, creepRole:string) {

        this.roomName=roomName;
        this.creepRole=creepRole;
    }

    actionRequest (room:Room):void {
        // Get the spawn object
        let s:StructureSpawn=room.availableSpawn;

        // Check spawn is valid
        if (_.isUndefined(s)) {
            return;
        }

        let f = this.creepFeatures(room);

        let n = this.creepRole + Game.time;

        switch (s.spawnCreep(f,n,{memory: {role:this.creepRole, homeRoom:room.name, workRoom:this.roomName}})) {
            case OK:
            break;
            case ERR_NOT_OWNER:
            console.log('Failed to spawn creep - ERR_NOT_OWNER')
            case ERR_NAME_EXISTS:
            console.log('Failed to spawn creep - ERR_NAME_EXISTS')
            case ERR_BUSY:
            console.log('Failed to spawn creep - ERR_BUSY')
            case ERR_NOT_ENOUGH_ENERGY:
            console.log('Failed to spawn creep - ERR_NOT_ENOUGH_ENERGY')
            case ERR_INVALID_ARGS:
            console.log('Failed to spawn creep - ERR_INVALID_ARGS')
            case ERR_RCL_NOT_ENOUGH:
            console.log('Failed to spawn creep - ERR_RCL_NOT_ENOUGH')

        }

    }

    creepFeatures (room:Room) {

        // WORK             100
        // MOVE             50
        // CARRY            50
        // ATTACK           80
        // RANGED_ATTACK    150
        // HEAL             200
        // TOUGH            10
        // CLAIM            600

        switch (this.creepRole) {
            case 'builder':
            case 'miner':
            default :
            return [WORK,WORK,CARRY,MOVE]

        }

    }

}
