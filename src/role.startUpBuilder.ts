import { CustomCreepMemory } from "./custom-creep-memory";
import { RoleUpgrader } from "./role.upgrader";
import { RoomFinder } from "./room-finder";

export class RoleStartUpBuilder {
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
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                RoleUpgrader.run(creep);
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
                RoomFinder.moveToNextRoom(creep, (creep.memory as CustomCreepMemory).target);
            }
        }
    }
}