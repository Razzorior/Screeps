import { CustomCreepMemory } from "./custom-creep-memory";
import { RoomFinder } from "./room-finder";

export class RolePatrol {
    public static run(creep: Creep) {
        if (creep.room.name == (creep.memory as CustomCreepMemory).target) {

            var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (enemy != undefined) {
                if (creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemy);
                }
            } else {
                creep.moveTo(17, 34);
                creep.say('Beware!', true);
            }
        }
        else {
            RoomFinder.moveToNextRoom(creep, (creep.memory as CustomCreepMemory).target);
        }
    }
}