import { CustomCreepMemory } from "./custom-creep-memory";

export class RoleImportHarvester {
    public static run(creep: Creep) {
        //.say("Be gone!",true);
        if ((creep.memory as CustomCreepMemory).working == true && creep.carry.energy == 0) {
            (creep.memory as CustomCreepMemory).working = false;
            creep.say('🔄 harvest');
        }
        else if (!(creep.memory as CustomCreepMemory).working && creep.carry.energy == creep.carryCapacity) {
            (creep.memory as CustomCreepMemory).working = true;
        }

        if ((creep.memory as CustomCreepMemory).working == true) {
            if (creep.room.name == (creep.memory as CustomCreepMemory).home) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
            else {
                var exit = creep.room.findExitTo((creep.memory as CustomCreepMemory).home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        else {
            if (creep.room.name == (creep.memory as CustomCreepMemory).target) {
                if (creep.carry.energy < creep.carryCapacity) {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
            else {
                var exit = creep.room.findExitTo((creep.memory as CustomCreepMemory).target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
}