import '../prototypes/room.prototype';
import '../prototypes/source.prototype';

export function run(): void {

    console.log('roomManager.run()');

    for (const i in Game.rooms) {
        const room: Room = Game.rooms[i];

        _checkSources(room);

    }

    for (const i in Game.rooms) {
        const room: Room = Game.rooms[i];

        room.spawnCreep();

    }

}

function _checkSources(room:Room): void {

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

