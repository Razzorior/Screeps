export interface CustomCreepMemory extends CreepMemory {

    home: string;

    role: string;

    dest: RoomPosition;

}
function extend<CreepMemory>(obj: CreepMemory): string {
    return obj as CustomCreepMemory;
}