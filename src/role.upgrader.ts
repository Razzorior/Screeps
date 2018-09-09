import { CustomCreepMemory } from "./custom-creep-memory";

export class RoleUpgrader {
    public static run(creep: Creep) {

        if ((creep.memory as CustomCreepMemory).upgrading && creep.carry.energy == 0) {
            (creep.memory as CustomCreepMemory).upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!(creep.memory as CustomCreepMemory).upgrading && creep.carry.energy == creep.carryCapacity) {
            (creep.memory as CustomCreepMemory).upgrading = true;
            creep.say('⚡ upgrade');
        }

        if ((creep.memory as CustomCreepMemory).upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffffff' } });
            }

        }
        else {
            /*
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {    
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            */
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                creep.say("No energy!");
            }
        }
    }
}