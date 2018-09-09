export interface CustomCreepMemory extends CreepMemory {
    home: string;
    role: string;


    dest: RoomPosition;
    building: boolean;
    farming: boolean;
    working: boolean;
    target: string;
    destination: string;
    targetHP: number;
    foundTarget: boolean;


    transporting: boolean;


    upgrading: boolean;
}