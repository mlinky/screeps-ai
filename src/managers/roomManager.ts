import '../prototypes/room.prototype';
import '../prototypes/source.prototype';

export abstract class roomManager {

    public static run(): void {

        for (const i in Game.rooms) {
            const room: Room = Game.rooms[i];

            // In case room is undefined
            if (room == undefined) {
                continue;
            }

            this.checkUpgraders(room);
            this.checkHaulers(room);
            this.checkConstruction(room);
            this.checkSources(room);
            this.handleTowers(room);



        }

        for (const i in Game.rooms) {
            const room: Room = Game.rooms[i];

            room.spawnCreep();

        }

    }

    private  static checkSources(room:Room): void {

        const sources: Source[] = room.sources;

        for (const j in sources) {

            const source:Source = sources[j];

            // Is the source claimed
            if (!source.isClaimed()) {
                // The source doesn't have an assigned miner
                room.requestCreep(room.name,'miner');
            }
        }
    }

    private static checkUpgraders(room:Room):void {

        if (room.hasSpawns) {
            // Decide on number of upgraders
            if (room.upgradersRequired > room.upgradersAvailable) {
                room.requestCreep(room.name, 'upgrader');
            }
        }
    }

    private static checkHaulers(room:Room):void {

        // Decide on number of upgraders
        if (room.haulersRequired > room.haulersAvailable) {
            room.requestCreep(room.name, 'hauler');
        }
    }

    private static checkConstruction(room:Room) {

        // Are there construction sites in the room
        if (room.constructionSites.length > 0) {
            // There are construction sites in the room
            if (room.buildersAvailable < 2) {
                room.requestCreep(room.name, 'builder');
            }
        }
    }

    private static handleTowers(room:Room) {

        if (room.towers.length > 0) {
            for (let tower of room.towers) {
                let closestHostile:Creep = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

                if(closestHostile != undefined) {
                    tower.attack(closestHostile);

                } else {
                    let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax * 0.8
                    });

                    if(closestDamagedStructure) {
                        tower.repair(closestDamagedStructure);
                    }

                }
            }
        }
    }
}

