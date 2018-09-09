import { Spawning } from './spawning';
import { CustomCreepMemory } from './custom-creep-memory';

export class Main {

    public loop() {
        // Checks if all creeps in the memory are still alive
        // If not, their memory get's deleted.
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Rest in piece:', name);
            }
        }
        // Iterates through all player rooms (not quite sure if buggy
        // Game.rooms might return alll rooms that are "not in fog of war"   
        // meaning that a single scout creep in a nother room could cause a spawning error.
        // In that case a nother condition is needed here.
        for (var room_name in Game.rooms) {
            var room = Game.rooms[room_name]
            var creeps: { [creepName: string]: Creep; } = {};
            var i = 0;
            for (var name in Game.creeps) {
                if ((Game.creeps[name].memory as CustomCreepMemory).home == room.name) {
                    creeps[i] = Game.creeps[name];
                    i++;
                }
            }
            Spawning.spawn_main(room, creeps);

            //Simple Tower AI.
            var towers = room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_TOWER
            });
            if (towers != undefined) {
                for (let tower of towers) {
                    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (target != undefined) {
                        tower.attack(target);
                    }
                    // In case no hostile enemy are close the tower helps repairing the roads. Gotta check how efficient this is done..
                    else {
                        var structure = tower.room.find(FIND_STRUCTURES, { filter: (s) => s.hits < (s.hitsMax - 400) && s.structureType == STRUCTURE_ROAD });

                        if (structure != undefined) {
                            tower.repair(structure[0]);
                        }
                    }
                }
            }
        }
    }
