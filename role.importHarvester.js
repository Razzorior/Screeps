module.exports = {

    run: function(creep) {
        //.say("Be gone!",true);
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        else if (!creep.memory.working  && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if (creep.room.name == creep.memory.home) {
                 var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
                });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            }
            else {
                var exit = creep.room.findExitTo(creep.memory.home);
               creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        else {
            if (creep.room.name == creep.memory.target) {
                if(creep.carry.energy < creep.carryCapacity) {
                    var sources = creep.room.find(FIND_SOURCES);
                     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                 }
             }
            }
            else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};