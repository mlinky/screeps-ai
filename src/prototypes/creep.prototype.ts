export {}

declare global {
    interface Creep {
        role:string;
        homeRoom:string;
        workRoom:string;
        source:Source;
        container:StructureContainer;

        runRole():void;

    }
}

Creep.prototype.runRole = function():void {

    switch (this.role) {
        case 'miner':
        creepMiner.runRole(this);
        break;
        default:
        break;
    }


}


Object.defineProperty(Creep.prototype, 'role', {
    get: function() {
        // If we dont have the value stored locally
        if (!this._role) {
            // Get the role from memory and store locally
            this._role = this.memory.role;
        }
        return this._role;
    },

    enumerable: false,
    configurable: true

});

Object.defineProperty(Creep.prototype, 'homeRoom', {
    get: function() {
        // If we dont have the value stored locally
        if (!this._homeRoom) {
            // Get the room from memory and store locally
            this._homeRoom = this.memory.homeRoom;
        }
        return this._homeRoom;
    },

    enumerable: false,
    configurable: true

});

Object.defineProperty(Creep.prototype, 'workRoom', {
    get: function() {
        // If we dont have the value stored locally
        if (!this._workRoom) {
            // Get the room from memory and store locally
            this._workRoom = this.memory.workRoom;
        }
        return this._workRoom;
    },

    enumerable: false,
    configurable: true

});

Object.defineProperty(Creep.prototype, 'source', {
    get: function():Source|undefined {
        // If we dont have the value stored locally
        if (!this._source) {
            // Get the source from memory and store locally
            this._source = Game.getObjectById(this.memory.source);
        }

        return this._source;
    },

    set: function(source:Source) {
        // Set the memory pointer
        this.memory.source=source.id;

        // Set the object in memory
        this._source = source;

    },

    enumerable: false,
    configurable: true

});

Object.defineProperty(Creep.prototype, 'container', {
    get: function():StructureContainer|undefined {
        // If we dont have the value stored locally
        if (!this._container) {
            // Get the container from memory and store locally
            this._container = Game.getObjectById(this.memory.container);
        }

        return this._container;

    },

    set: function(container:StructureContainer) {
        // Set the memory pointer
        this.memory.container=container.id;

        // Set the object in memory
        this._source = container;

    },

    enumerable: false,
    configurable: true

});

abstract class creepMiner {

    public static runRole(creep:Creep) {

        // Check the miner has a source defined
        if (creep.source == undefined) {
            // Loop sources looking for an unclaimed source
            for (let source of creep.room.sources) {
                if (!source.isClaimed()) {
                    // Source is not yet claimed
                    source.claim(creep);
                    creep.source=source;
                    break;
                }
            }
        }

        // Check we now have a source
        if (creep.source == undefined) {
            // Still no source - wait until next loop
            console.log('Idle miner ' + creep.name + ' in room ' + creep.room.name);
            return;
        }

        if (creep.carry.energy < creep.carryCapacity) {
            // Try and collect more energy
            if (creep.harvest(creep.source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.source);
            }
        } else {
            // Check we have a container
            if (creep.container == undefined) {
                if (this.setContainer(creep)==false) {
                    return;
                }
            }

            // fill container
            creep.transfer(creep.container,RESOURCE_ENERGY);

        }

    }

    private static setContainer(creep:Creep):boolean {

        // Find a nearby container
        let container:AnyStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        });

        // Set the container
        if (container instanceof StructureContainer && this.isNearby(creep, container.pos)) {
            creep.container=container;
            return true;
        }

        // Try to find a container under construction
        let constructionSite:ConstructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        });

        // Check that the construction site is close enough
        if (constructionSite!=null && this.isNearby(creep, constructionSite.pos)) {
            creep.build(constructionSite);
            return false;
        }

        // We need to place a new construction site
        creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER);

        return false;

    }

    private static isNearby(creep:Creep, pos:RoomPosition):boolean {

        var result = PathFinder.search(creep.pos,pos);

        if (result == undefined) {
            // No results
            return false;
        } else if (result.path.length <= 1) {
            // Only one step
            return true;
        } else {
            // More than one step
            return false;
        }
    }
}
