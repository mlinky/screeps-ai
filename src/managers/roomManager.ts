import '../prototypes/room.prototype';


export function run(): void {

    console.log('roomManager.run()');

    for (const i in Game.rooms) {
        const room: Room = Game.rooms[i];

        console.log('Room loop ' + room.name);

        _checkSources(room);

    }

}

function _checkSources(room:Room): void {

    const sources: Source[] = room.sources;

    for (const j in sources) {

        const source:Source = sources[j];
        console.log('Source ' + source.id);





    }

}
