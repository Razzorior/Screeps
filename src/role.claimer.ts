import { CustomCreepMemory } from "./custom-creep-memory";

export class RoleClaimer {
    public static run(creep: Creep) {
        if (creep.room.name == (creep.memory as CustomCreepMemory).target) {
            var controll: StructureController[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTROLLER)
                }
            }).map(entry => entry as StructureController);
            if (creep.claimController(controll[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controll[0]);
            } else {

            }
        }
        else {
            const exit: ExitConstant | ERR_NO_PATH | ERR_INVALID_ARGS = creep.room.findExitTo((creep.memory as CustomCreepMemory).target);
            // TODO find solution
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }

}