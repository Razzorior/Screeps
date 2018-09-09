module.exports = {
    run: function(creep) {
        if (creep.room.name == creep.memory.target) {

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

            if(towers.length > 0) {
                if(creep.attack(towers[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0]);
                }
            } else if (spawners.length > 0) {
                if(creep.attack(spawners[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawners[0]);
                }
            } else { var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(enemy != undefined) {
                    if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemy);
                    }
                } else {
                    creep.moveTo(17,34);
                    creep.say('Beware!',true);
                }
            }        
        }
        else {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};