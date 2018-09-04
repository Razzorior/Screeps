/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.reserver');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
         if (creep.room.name == creep.memory.target) {
            var controll = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTROLLER)
                    }
            });
           if(creep.reserveController(controll[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controll[0]);
           } else {

           }
        }
        else {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
    
};