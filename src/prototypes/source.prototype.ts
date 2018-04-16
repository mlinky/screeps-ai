export {}

declare global {
    interface Source {
        creepID:string;
        claim(creep:Creep):boolean;
        isClaimed():boolean;
    }
}

Object.defineProperty(Source.prototype, 'creepID', {
    get: function():string {
        // If we dont have the value stored locally
        if (!this._creepID) {
            // Get the info from memory and store locally
            this._creepID = _getCreepID(this);
        }
        return this._creepID;
    },

    enumerable: false,
    configurable: true

});

Source.prototype.claim = function(creep:Creep):boolean {

    console.log('Source claim');
    return true;

};

Source.prototype.isClaimed = function():boolean {

    console.log('Source isClaimed');

    // Is creepID setup at all
    if (!this.creepID) {
        console.log('No creep assigned');
        return false;
    }

    // Does the creep
    if (!(this.creepID in Game.creeps)) {
        console.log('Creep ' + this.creepID + ' no longer exists');
        return false;
    }

    return true;

};

// Internal functions
function _bootStrapSourceMemory(source:Source):void {

    if (_.isUndefined(Memory.m)) {
        Memory.m = new Object();
    }

    if (_.isUndefined(Memory.m.rooms)) {
        Memory.m.rooms = new Object();
    }

    if (_.isUndefined(Memory.m.rooms[source.room.name])) {
        Memory.m.rooms[source.room.name] = new Object();
    }

    if (_.isUndefined(Memory.m.rooms[source.room.name].sources)) {
        Memory.m.rooms[source.room.name].sources = new Object();
    }

    if (_.isUndefined(Memory.m.rooms[source.room.name].sources[source.id])) {
        Memory.m.rooms[source.room.name].sources[source.id] = new Object();
    }

}

function _getCreepID(source:Source):string {

    _bootStrapSourceMemory(source);

    return Memory.m.rooms[source.room.name].sources[source.id].creepID;
}

