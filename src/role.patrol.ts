import { CustomCreepMemory } from "./custom-creep-memory";

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
            var exit = creep.room.findExitTo((creep.memory as CustomCreepMemory).target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
}