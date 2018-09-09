import { RoleUpgrader } from "./role.upgrader";
import { CustomCreepMemory } from "./custom-creep-memory";

export class RoleBuilder {
    public static run(creep: Creep) {
        if ((creep.memory as CustomCreepMemory).building && creep.carry.energy == 0) {
            (creep.memory as CustomCreepMemory).building = false;
            creep.say('🔄 harvest');
        }
        if (!(creep.memory as CustomCreepMemory).building && creep.carry.energy == creep.carryCapacity) {
            (creep.memory as CustomCreepMemory).building = true;
            creep.say('🚧 build');
        }

        if ((creep.memory as CustomCreepMemory).building) {
            const targets: ConstructionSite[] = creep.room.find(FIND_CONSTRUCTION_SITES).map(entry => entry as ConstructionSite);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                RoleUpgrader.run(creep);
            }
        }
        else {
            const targets: Array<StructureContainer | StructureStorage> = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                }
            }).map(entry => entry as StructureContainer);
            if (targets.length > 0) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { ignoreCreeps: true, visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }
}