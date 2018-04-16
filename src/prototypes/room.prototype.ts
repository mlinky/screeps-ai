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

    interface CreepRequest {
        roomName:string;
        creepRole:string;
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
        for (var spawn of this.spawns) {
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

    this.creepsNeeded.push({roomName:requestRoom, creepRole:requestRole});

};

Room.prototype.canSpawn = function():boolean {

    for (var spawn of this.spawns) {
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

    if (spawnRole(this,'miner')){
        return;
    }

};

/////

function spawnRole(room:Room,role:string):boolean {

    var r:CreepRequest = _.find(room.creepsNeeded, function (o:CreepRequest) { return o.creepRole === role; });
    if (!_.isUndefined(r)) {
        spawnCreep(room,r);
        return true;
    }

    return false;

}

function spawnCreep(room:Room,request:CreepRequest):void {

    // Get the spawn object
    var s:StructureSpawn=room.availableSpawn;

    // Check spawn is valid
    if (_.isUndefined(s)) {
        return;
    }

    //var f = creepFeatures(room,request.creepRole);

}
