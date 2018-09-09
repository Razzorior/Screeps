var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
           if(creep.pos.x != creep.memory.dest.x || creep.pos.y != creep.memory.dest.y) {
                creep.moveTo(creep.memory.dest.x,creep.memory.dest.y);
               
           } else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.harvest(sources[1]); // should not cause any errors but still not the best way to solve the problem.
            }
           }
	}
};

module.exports = roleHarvester;