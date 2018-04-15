import { ErrorMapper } from "utils/ErrorMapper";
import * as roomManager from "managers/roomManager";
import * as memoryManager from "managers/memoryManager";


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);

  memoryManager.run();

  roomManager.run();

});
