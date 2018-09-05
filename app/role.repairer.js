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
            var structure = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.hits < (s.hitsMax-400) && (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_TOWER || s.structureType == STRUCTURE_ROAD)});
            var weakest = structure[0];
            /*for(var i = 1; i<structure.length;i++) {
                if(weakest.hits > structure[i].hits) {
                    weakest = structure[i];
                }
            }*/

            if (weakest != undefined) {
                if (creep.repair(weakest) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(weakest,{visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }  else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == /*STRUCTURE_STORAGE*/ STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                    }
               });
               if(targets.length > 0) {
                   if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                   }
               } else {
	           
	           var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
               }
           
        }
    }
};
