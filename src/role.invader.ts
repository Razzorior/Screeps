import { CustomCreepMemory } from "./custom-creep-memory";
import { RoomFinder } from "./room-finder";

export class RoleInvader {
    public static run(creep: Creep) {
        if (creep.room.name == (creep.memory as CustomCreepMemory).target) {

            var towers = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (towers) => {
                    return (towers.structureType == STRUCTURE_TOWER)
                }
            });

            var spawners = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (spawners) => {
                    return (spawners.structureType == STRUCTURE_SPAWN)
                }
            });

            var extensions = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (extensions) => {
                    return (extensions.structureType == STRUCTURE_EXTENSION)
                }
            });

            if (towers.length > 0) {
                if (creep.attack(towers[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0], { maxRooms: 1 } as MoveToOpts);
                }
            } else if (spawners.length > 0) {
                if (creep.attack(spawners[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawners[0], { maxRooms: 1} as MoveToOpts);
                }
            } else if (extensions.length > 0) {
                if (creep.attack(extensions[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensions[0], { maxRooms: 1} as MoveToOpts);
                }
            }
            else {
                var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (enemy != undefined) {
                    if (creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemy, {maxRooms: 1} as MoveToOpts);
                    }
                } else {
                    var plannedBuildings = creep.room.find(FIND_HOSTILE_CONSTRUCTION_SITES);
                    if(plannedBuildings.length > 0) {
                        if(creep.pos != plannedBuildings[0].pos) {
                            creep.moveTo(plannedBuildings[0].pos, {maxRooms: 1, stroke: '#ffffff'} as MoveToOpts);
                        }
                    } else {
                        creep.moveTo(17, 34, {maxRooms: 1} as MoveToOpts);
                        creep.say('Beware!', true);
                    }
                    
                }
            }
        }
        else {
            RoomFinder.moveToNextRoom(creep, (creep.memory as CustomCreepMemory).target);
        }
    }
}