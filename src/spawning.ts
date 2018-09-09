import { CustomCreepMemory } from "./custom-creep-memory";

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawning');
 * mod.thing == 'a thing'; // true
 */
export class Spawning {

    public static spawn_main(room: Room, creeps: { [creepName: string]: Creep; }) {

        var spawners: StructureSpawn[] = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN)
            }
        }).map(entry => entry as StructureSpawn);

        var Spawn1;
        var Spawn2;

        if (spawners.length > 0) {
            Spawn1 = spawners[0].name;
            console.log('I was here');
            if (spawners.length > 1) { Spawn2 = spawners[1].name; }

            var HOME = room.name;

            //Counts the number of certain workers in the room.
            var harvesters = 0;
            var harvesters0 = 0;
            var upgraders = 0;
            var builders = 0;
            var repairers = 0;
            var repairersWall = 0;
            var transporters = 0;
            var importHarvesters = 0;
            var importHarvesters1 = 0;
            var patrols = 0;
            var reservers = 0;
            var claimers = 0;
            var harvesterNotfall = 0;
            var invaders = 0;
            for (var name in creeps) {
                var creep = creeps[name];
                if ((creep.memory as CustomCreepMemory).role == 'harvester') { harvesters++; }
                if ((creep.memory as CustomCreepMemory).role == 'harvester0') { harvesters0++ }
                if ((creep.memory as CustomCreepMemory).role == 'upgrader') { upgraders++; }
                if ((creep.memory as CustomCreepMemory).role == 'builder') { builders++; }
                if ((creep.memory as CustomCreepMemory).role == 'repairer') { repairers++; }
                if ((creep.memory as CustomCreepMemory).role == 'repairerWall') { repairersWall++; }
                if ((creep.memory as CustomCreepMemory).role == 'transporter') { transporters++; }
                if ((creep.memory as CustomCreepMemory).role == 'importHarvester') { importHarvesters++; }
                if ((creep.memory as CustomCreepMemory).role == 'importHarvester1') { importHarvesters1++; }
                if ((creep.memory as CustomCreepMemory).role == 'patrol') { patrols++; }
                if ((creep.memory as CustomCreepMemory).role == 'reserver') { reservers++; }
                if ((creep.memory as CustomCreepMemory).role == 'claimer') { claimers++; }
                if ((creep.memory as CustomCreepMemory).role == 'harvesterNotfall') { harvesterNotfall++; }
                if ((creep.memory as CustomCreepMemory).role == 'invader') { invaders++; }
            }

            // The case that no spawner exists must be checked. (you can own a controller without having a spawner)
            switch (room.controller.level) {
                case 1:
                    if (harvesterNotfall < 3) {
                        var newName = "Harvester_" + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([CARRY, CARRY, WORK, MOVE], newName,
                            { memory: { role: 'harvesterNotfall', home: HOME } });
                    }
                    break;
                case 2:
                    break;
                case 3:
                    var containers: StructureContainer[] = room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER)
                        }
                    }).map(entry => entry as StructureContainer);
                    if (containers.length > 0) {
                        var pos1 = containers[0].pos;
                        if (harvesters < 1) {
                            var newName = 'Harvester_' + HOME + '_' + Game.time;
                            Game.spawns[Spawn1].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                                { memory: { role: 'harvester', home: HOME, dest: pos1 } });
                        }
                        if (containers.length > 1) {
                            var pos2 = containers[1].pos;
                            if (harvesters0 < 1) {
                                var newName = 'Harvester_' + HOME + '_' + Game.time;
                                Game.spawns[Spawn1].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                                    { memory: { role: 'harvester0', home: HOME, dest: pos2 } });
                            }
                        }
                    }
                    if (transporters < 1) {
                        var newName = 'Transporter_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                            { memory: { role: 'transporter', home: HOME } });
                    }
                    if (upgraders < 3) {
                        var newName = 'Upgrader_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
                            { memory: { role: 'upgrader', home: HOME } });
                    }
                    if (repairers < 1) {
                        var newName = 'Repairer_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                            { memory: { role: 'repairer', home: HOME } });
                    }
                    if (builders < 2) {
                        var newName = 'Builder_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
                            { memory: { role: 'builder', home: HOME } });
                    }
                    if (harvesterNotfall < 3) {
                        var newName = "Harvester_" + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([CARRY, CARRY, WORK, MOVE], newName,
                            { memory: { role: 'harvesterNotfall', home: HOME } });
                    }
                    break;
                case 4:
                    var containers: StructureContainer[] = room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER)
                        }
                    }).map(entry => entry as StructureContainer);
                    if (containers.length > 0) {
                        var pos1 = containers[0].pos;
                        if (harvesters < 1) {
                            var newName = 'Harvester_' + HOME + '_' + Game.time;
                            Game.spawns[Spawn1].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                                { memory: { role: 'harvester', home: HOME, dest: pos1 } });
                        }
                        if (containers.length > 1) {
                            var pos2 = containers[1].pos;
                            if (harvesters0 < 1) {
                                var newName = 'Harvester_' + HOME + '_' + Game.time;
                                Game.spawns[Spawn1].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                                    { memory: { role: 'harvester0', home: HOME, dest: pos2 } });
                            }
                        }
                    }
                    if (transporters < 2) {
                        var newName = 'Transporter_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                            { memory: { role: 'transporter', home: HOME } });
                    }
                    if (upgraders < 3) {
                        var newName = 'Upgrader_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                            { memory: { role: 'upgrader', home: HOME } });
                    }
                    if (repairers < 1) {
                        var newName = 'Repairer_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                            { memory: { role: 'repairer', home: HOME } });
                    }
                    if (builders < 2) {
                        var newName = 'Builder_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
                            { memory: { role: 'builder', home: HOME } });
                    }
                    if (repairersWall < 1) {
                        var newName = 'WallRepairer_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                            { memory: { role: 'repairerWall', home: HOME } });
                    }
                    if (invaders < 0) {
                        var newName = 'HelloKitty_' + HOME + '_' + Game.time;
                        Game.spawns[Spawn1].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE], newName,
                            { memory: { role: 'invader', home: HOME, target: 'W58N58' } });
                    }
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
                case 8:
                    break;
            }

            if (Game.spawns[Spawn1].spawning) {
                var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
                Game.spawns[Spawn1].room.visual.text(
                    '🛠️' + (spawningCreep.memory as CustomCreepMemory).role,
                    Game.spawns[Spawn1].pos.x - 2,
                    Game.spawns[Spawn1].pos.y + 1,
                    { valign: 'top', opacity: 0.8 } as TextStyle);
            }
        }
    }
}
