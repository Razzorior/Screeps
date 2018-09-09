import { CustomCreepMemory } from "./custom-creep-memory";
import { RoleBuilder } from "./role.builder";

export class RoleRepairerWall {
    public static run(creep: Creep) {
        const hpUntilRetarget = 20000;

        if ((creep.memory as CustomCreepMemory).working == true && creep.carry.energy == 0) {
            (creep.memory as CustomCreepMemory).working = false;
        }
        else if (!(creep.memory as CustomCreepMemory).working && creep.carry.energy == creep.carryCapacity) {
            (creep.memory as CustomCreepMemory).working = true;
        }

        if ((creep.memory as CustomCreepMemory).working == true) {
            var ramparts = creep.room.find(FIND_STRUCTURES, {
                filter: (ramparts) => {
                    return (ramparts.structureType == STRUCTURE_RAMPART) &&
                        ramparts.hits == 1;
                }
            });

            if (ramparts.length > 0) {
                (creep.memory as CustomCreepMemory).destination = ramparts[0].id;
                (creep.memory as CustomCreepMemory).targetHP = 1;
                (creep.memory as CustomCreepMemory).foundTarget = true;
            }

            if (!(creep.memory as CustomCreepMemory).foundTarget) {
                var structure = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) });
                var weakest = structure[0];
                for (var i = 1; i < structure.length; i++) {
                    if (weakest.hits > (structure[i].hits)) {
                        weakest = structure[i];
                    }
                }
                (creep.memory as CustomCreepMemory).destination = weakest.id;
                (creep.memory as CustomCreepMemory).foundTarget = true;
                (creep.memory as CustomCreepMemory).targetHP = weakest.hits;
            } else {
                var destination = (Game.getObjectById((creep.memory as CustomCreepMemory).destination) as StructureWall | StructureRampart);
                if (destination.hits > ((creep.memory as CustomCreepMemory).targetHP + hpUntilRetarget)) {
                    console.log("Looking for a new Target");
                    (creep.memory as CustomCreepMemory).foundTarget = false;
                } else {
                    if ((creep.memory as CustomCreepMemory).destination != undefined) {
                        if (creep.repair(destination) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(destination, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }
                    }
                    else {
                        RoleBuilder.run(creep);
                    }
                }

            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {

                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }

        }
    }
}