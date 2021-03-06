import { Spawning } from './spawning';
import { CustomCreepMemory } from './custom-creep-memory';
import { RoleHarvester } from './role.harvester';
import { RoleBuilder } from './role.builder';
import { RoleUpgrader } from './role.upgrader';
import { RoleRepairer } from './role.repairer';
import { RoleRepairerWall } from './role.repairerWall';
import { RoleTransporter } from './role.transporter';
import { RoleImportHarvester } from './role.importHarvester';
import { RoleStartUpBuilder } from './role.startUpBuilder';
import { RolePatrol } from './role.patrol';
import { RoleReserver } from './role.reserver';
import { RoleClaimer } from './role.claimer';
import { RoleHarvesterNotfall } from './role.harvesterNotfall';
import { RoleInvader } from './role.invader';

export function loop() {
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
        var towers: StructureTower[] = room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_TOWER
        }).map(entry => entry as StructureTower);
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


    // keeping this code just in case the spawning.js is buggy, can be deleted soon.
    /*
        if(harvesters < 1) {
            var newName = 'Harvester_' + HOME + '_' +  Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns[Spawn1].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
                {memory: {role: 'harvester',home: HOME}});
        }
        
        if(harvesters0 < 0) {
            var newName = 'Harvester_' + HOME + '_' +  Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns[Spawn1].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
                {memory: {role: 'harvester0',home: HOME}});
        }
        
        if(transporters < 1) {
            var newName = 'Transporter_' + HOME + '_' +  Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns[Spawn1].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'transporter',home: HOME}});
        }
        
        if(upgraders < 3) {
            var newName = 'Upgrader_' + HOME + '_' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'upgrader',home: HOME}});
        }
        
        if(repairers < 1) {
            var newName = 'Repairer_' + HOME + '_' + Game.time;
            //console.log('Spawning new repairer: ' + newName);
            Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'repairer',home: HOME}});
        }
        if(repairersWall < 0) {
            var newName = 'WallRepairer_' + HOME + '_' + Game.time;
            //console.log('Spawning new repairer: ' + newName);
            Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'repairerWall',home: HOME}});
        }
        if(importHarvesters < 0) {
            var newName = 'ImportHarvester_' + HOME + '_' + Game.time;
            Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'importHarvester',home: HOME,target: 'E56S2'}});
        }
        if(importHarvesters1 < 0) {
            var newName = 'ImportHarvester1_' + HOME + '_' + Game.time;
            Game.spawns[Spawn1].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'importHarvester1',home: HOME,target: 'E55S3'}});
        }
        
        if(builders < 2) {
            var newName = 'Builder_' + HOME + '_' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'builder',home: HOME}});
        }
        
        if(patrols < 0) {
            var newName = 'Patrol_' + HOME + '_' + Game.time;
            //console.log('Spawning new patrol: ' + newName);
            Game.spawns[Spawn1].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,MOVE], newName, 
                {memory: {role: 'patrol',target: 'E56S2',home: HOME}});
        }
        if(reservers < 0){
            var newName = "Reserver_" + HOME + '_' + Game.time;
            Game.spawns[Spawn1].spawnCreep([CLAIM,CLAIM,MOVE,MOVE], newName,
                {memory: {role: 'reserver',home: HOME,target: 'E56S2'}});
        }
        if(claimers < 0){
            var newName = "Claimer_" + HOME + '_' + Game.time;
            Game.spawns[Spawn1].spawnCreep([CLAIM,CLAIM,MOVE,MOVE], newName,
                {memory: {role: 'claimer',home: HOME,target: 'E55S3'}});
        }
        if(harvesterNotfall < 3){
            var newName = "Harvester_" + HOME + '_' + Game.time;
            Game.spawns[Spawn1].spawnCreep([CARRY,CARRY,WORK,MOVE], newName,
                {memory: {role: 'harvesterNotfall',home: HOME}});
        }
        
        if(Game.spawns[Spawn1].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns[Spawn1].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[Spawn1].pos.x-2, 
                Game.spawns[Spawn1].pos.y+1, 
                {align: 'top', opacity: 0.8});
        }
    */
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if ((creep.memory as CustomCreepMemory).role == 'harvester') {
            RoleHarvester.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'harvester0') {
            RoleHarvester.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'upgrader') {
            RoleUpgrader.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'builder') {
            RoleBuilder.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'repairer') {
            RoleRepairer.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'repairerWall') {
            RoleRepairerWall.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'transporter') {
            RoleTransporter.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'importHarvester') {
            RoleImportHarvester.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'importHarvester1') {
            RoleStartUpBuilder.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'patrol') {
            RolePatrol.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'reserver') {
            RoleReserver.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'claimer') {
            RoleClaimer.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'harvesterNotfall') {
            RoleHarvesterNotfall.run(creep);
        }
        if ((creep.memory as CustomCreepMemory).role == 'invader') {
            RoleInvader.run(creep);
        }
    }
}
