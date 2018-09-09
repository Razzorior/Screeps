import { CustomCreepMemory } from "./custom-creep-memory";
import { RoleBuilder } from "./role.builder";

export class RoleRepairer {
    public static run(creep: Creep) {
        if ((creep.memory as CustomCreepMemory).working == true && creep.carry.energy == 0) {
            (creep.memory as CustomCreepMemory).working = false;
        }
        else if (!(creep.memory as CustomCreepMemory).working && creep.carry.energy == creep.carryCapacity) {
            (creep.memory as CustomCreepMemory).working = true;
        }

        if ((creep.memory as CustomCreepMemory).working == true) {
            var structure = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.hits < (s.hitsMax - 400) && (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_TOWER || s.structureType == STRUCTURE_ROAD) });
            var weakest = structure[0];
            /*for(var i = 1; i<structure.length;i++) {
                if(weakest.hits > structure[i].hits) {
                    weakest = structure[i];
                }
            }*/

            if (weakest != undefined) {
                if (creep.repair(weakest) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(weakest, { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else {
                RoleBuilder.run(creep);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == /*STRUCTURE_STORAGE*/ STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {

                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }
}