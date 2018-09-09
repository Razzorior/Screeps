import { CustomCreepMemory } from "./custom-creep-memory";

export class RoleTransporter {
    public static run(creep: Creep) {
        if ((creep.memory as CustomCreepMemory).transporting && creep.carry.energy == 0) {
            (creep.memory as CustomCreepMemory).transporting = false;
            creep.say('🔄collect');
        }
        if (!(creep.memory as CustomCreepMemory).transporting && creep.carry.energy == creep.carryCapacity) {
            (creep.memory as CustomCreepMemory).transporting = true;
            creep.say('♿transporting');
        }

        if ((creep.memory as CustomCreepMemory).transporting == true) {
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets != undefined) {
                if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var storages = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.storeCapacity > structure.store[RESOURCE_ENERGY];
                    }
                });
                if (storages.length > 0) {
                    if (creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storages[0], { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        } else {
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                }
            });
            if (targets != undefined) {
                if (creep.withdraw(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var storages = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.storeCapacity > structure.store[RESOURCE_ENERGY];
                    }
                });
                if (storages.length > 0) {
                    if (creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storages[0], { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
    }
}