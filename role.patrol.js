/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.patrol');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        if (creep.room.name == creep.memory.target) {

            var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(enemy != undefined) {
                if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemy);
                }
            } else {
                creep.moveTo(17,34);
                creep.say('Beware!',true);
            }
        }
        else {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};