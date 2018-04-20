import '../prototypes/room.prototype';
import '../prototypes/creep.prototype';
import '../prototypes/source.prototype';

export abstract class creepManager {

    public static run(): void {

        console.log('creepManager.run()');

        for (const i in Game.creeps) {
             const c: Creep = Game.creeps[i];

             c.runRole();

        }

    }

}

