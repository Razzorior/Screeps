/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawning');
 * mod.thing == 'a thing'; // true
 */

 /*
 * This might be usefull:
 * room.energyAvailable; 
 * 
 * Gives the amount of energy in the room available for spawning. (spawners, extensions)
 */
module.exports = {
    spawn_main: function(room, creeps) {

    var HOME = room.name;

    spawners = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN) 
        }
    });

    var Spawn1;
    var Spawn2;

    if(spawners.length > 0) { 
        Spawn1 = spawners[0].name;
        if(spawners.length > 1) { Spawn2 = spawners[1].name;}
    };


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
        for(var name in creeps) {
            var creep = creeps[name];
            if(creep.memory.role=='harvester') { harvesters++; }
            if(creep.memory.role=='harvester0') { harvesters0++ }
            if(creep.memory.role=='upgrader') { upgraders++; }
            if(creep.memory.role=='builder') {  builders++; }
            if(creep.memory.role=='repairer') {  repairers++; }
            if(creep.memory.role=='repairerWall'){ repairersWall++; }
            if(creep.memory.role=='transporter'){ transporters++;}
            if(creep.memory.role=='importHarvester'){ importHarvesters++; }
            if(creep.memory.role=='importHarvester1'){ importHarvesters1++; }
            if(creep.memory.role=='patrol'){ patrols++; }
            if(creep.memory.role=='reserver'){ reservers++; }
            if(creep.memory.role=='claimer'){ claimers++; }
            if(creep.memory.role=='harvesterNotfall') {harvesterNotfall++; }
        }

        // The case that no spawner exists must be checked. (you can own a controller without having a spawner)
        switch(room.controller.level) {
            case 1:
                if(harvesterNotfall < 3){
                    var newName = "Harvester_" + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([CARRY,CARRY,WORK,MOVE], newName,
                        {memory: {role: 'harvesterNotfall',home: HOME}});
                }
                break;
            case 2: 
                break;
            case 3:
                containers = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) 
                    }
                });
                if(containers.length > 0) {
                    var pos1 = containers[0].pos;
                    if(harvesters < 1) {
                        var newName = 'Harvester_' + HOME + '_' +  Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
                            {memory: {role: 'harvester',home: HOME,dest: pos1}});
                    }
                    if(containers.length > 1) {
                        var pos2 = containers[1].pos;
                        if(harvesters0 < 1) {
                            var newName = 'Harvester_' + HOME + '_' +  Game.time;
                            Game.spawns[Spawn1].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
                                {memory: {role: 'harvester0',home: HOME,dest: pos2}});
                        }
                    }
                }
                if(transporters < 1) {
                    var newName = 'Transporter_' + HOME + '_' +  Game.time;
                    Game.spawns[Spawn1].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'transporter',home: HOME}});
                }
                if(upgraders < 3) {
                    var newName = 'Upgrader_' + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'upgrader',home: HOME}});
                }
                if(repairers < 1) {
                    var newName = 'Repairer_' + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'repairer',home: HOME}});
                }
                if(builders < 2) {
                    var newName = 'Builder_' + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'builder',home: HOME}});
                }
                if(harvesterNotfall < 3){
                    var newName = "Harvester_" + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([CARRY,CARRY,WORK,MOVE], newName,
                        {memory: {role: 'harvesterNotfall',home: HOME}});
                }
                break;
            case 4:
                containers = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) 
                    }
                });
                if(containers.length > 0) {
                    var pos1 = containers[0].pos;
                    if(harvesters < 1) {
                        var newName = 'Harvester_' + HOME + '_' +  Game.time;
                        Game.spawns[Spawn1].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
                            {memory: {role: 'harvester',home: HOME,dest: pos1}});
                    }
                    if(containers.length > 1) {
                        var pos2 = containers[1].pos;
                        if(harvesters0 < 1) {
                            var newName = 'Harvester_' + HOME + '_' +  Game.time;
                            Game.spawns[Spawn1].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
                                {memory: {role: 'harvester0',home: HOME,dest: pos2}});
                        }
                    }
                }
                if(transporters < 2) {
                    var newName = 'Transporter_' + HOME + '_' +  Game.time;
                    Game.spawns[Spawn1].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'transporter',home: HOME}});
                }
                if(upgraders < 3) {
                    var newName = 'Upgrader_' + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                        {memory: {role: 'upgrader',home: HOME}});
                }
                if(repairers < 1) {
                    var newName = 'Repairer_' + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'repairer',home: HOME}});
                }
                if(builders < 2) {
                    var newName = 'Builder_' + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'builder',home: HOME}});
                }
                if(repairersWall < 1) {
                    var newName = 'WallRepairer_' + HOME + '_' + Game.time;
                    Game.spawns[Spawn1].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'repairerWall',home: HOME}});
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
        
        if(Game.spawns[Spawn1].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns[Spawn1].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[Spawn1].pos.x-2, 
                Game.spawns[Spawn1].pos.y+1, 
                {align: 'top', opacity: 0.8});
        }
        
    }
};