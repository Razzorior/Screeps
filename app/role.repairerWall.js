var roleBuilder = require('role.builder');
//var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if(!creep.memory.foundTarget) {
                var structure = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)});
                var weakest = structure[0];
                for(var i = 1; i<structure.length;i++) {
                    if(weakest.hits > (structure[i].hits)) {
                        weakest = structure[i];
                    }
                }
                creep.memory.destination = weakest.id;
                creep.memory.foundTarget = true;
                creep.memory.targetHP = weakest.hits;
            } else {
                if(Game.getObjectById(creep.memory.destination).hits > (creep.memory.targetHP + 20000)) {
                    console.log("Looking for a new Target");
                    creep.memory.foundTarget = false;
                } else {
                    if (creep.memory.destination != undefined) {
                        if (creep.repair(Game.getObjectById(creep.memory.destination)) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(creep.memory.destination),{visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    else {
                        roleBuilder.run(creep);
                    }
                }
                
            }
        }  else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                    }
               });
               if(targets.length > 0) {
                   if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                   }
               } else {
	           
	           var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
               }
           
        }
    }
};
