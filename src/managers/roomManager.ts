import '../prototypes/room.prototype';
import '../prototypes/source.prototype';

export abstract class roomManager {

    public static run(): void {

        console.log('roomManager.run()');

        for (const i in Game.rooms) {
            const room: Room = Game.rooms[i];

            this._checkSources(room);

        }

        for (const i in Game.rooms) {
            const room: Room = Game.rooms[i];

            room.spawnCreep();

        }

    }

    private  static _checkSources(room:Room): void {

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
}

