module.exports = {
    run: function(creep){
        if(creep.memory.transporting && creep.carry.energy == 0) {
            creep.memory.transporting = false;
            creep.say('🔄collect');
	    }
	    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transporting = true;
	        creep.say('♿transporting');
	    }
	    
	    if(creep.memory.transporting == true) {
	        var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets != undefined) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var storages = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.storeCapacity > structure.store[RESOURCE_ENERGY];
                    }
                });
                if(storages.length > 0) {
                    if(creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storages[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } 
            }
	    } else {
	        var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                    }
                });
            if(targets != undefined) {
                if(creep.withdraw(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var storages = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.storeCapacity > structure.store[RESOURCE_ENERGY];
                    }
                });
                if(storages.length > 0) {
                    if(creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storages[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } 
            }
	    }
	    
    }
};