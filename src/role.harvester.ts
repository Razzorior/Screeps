import { CustomCreepMemory } from "./custom-creep-memory";

export class RoleHarvester {

    /** @param {Creep} creep **/
    public static run(creep: Creep) {
        if (creep.pos.x != (creep.memory as CustomCreepMemory).dest.x || creep.pos.y != (creep.memory as CustomCreepMemory).dest.y) {
            creep.moveTo((creep.memory as CustomCreepMemory).dest.x, (creep.memory as CustomCreepMemory).dest.y);

        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.harvest(sources[1]); // should not cause any errors but still not the best way to solve the problem.
            }
        }
    }
}
