import '../prototypes/room.prototype';
import '../prototypes/creep.prototype';
import '../prototypes/source.prototype';

export abstract class creepManager {

    public static run(): void {

        for (const i in Game.creeps) {
             const c: Creep = Game.creeps[i];

             c.runRole();

        }

    }

}

