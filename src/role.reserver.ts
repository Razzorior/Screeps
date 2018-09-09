import { CustomCreepMemory } from "./custom-creep-memory";
import { RoomFinder } from "./room-finder";

export class RoleReserver {
    public static run(creep: Creep) {
        if (creep.room.name == (creep.memory as CustomCreepMemory).target) {
            var controll: StructureController[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTROLLER)
                }
            }).map(entry => entry as StructureController);
            if (creep.reserveController(controll[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controll[0]);
            } else {

            }
        }
        else {
            RoomFinder.moveToNextRoom(creep, (creep.memory as CustomCreepMemory).target);
        }
    }
}