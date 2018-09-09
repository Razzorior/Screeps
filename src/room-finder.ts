export class RoomFinder {
    public static moveToNextRoom(creep: Creep, targetRoom: string) {
        var route = Game.map.findRoute(creep.room, targetRoom);
        if (route != -2 && route.length > 0) {
            var exit = creep.pos.findClosestByRange(route[0].exit);
            if (exit != null) {
                if (creep.pos.x == exit.x && creep.pos.y == exit.y) {
                    var nextStep = this.nextStepIntoRoom(creep.pos, targetRoom);
                    creep.moveTo(nextStep);
                } else {
                    creep.moveTo(exit);
                }
            }
        }
    }
    private static nextStepIntoRoom(pos: RoomPosition, nextRoom: string): RoomPosition {
        var x = pos.x;
        var y = pos.y;
        if (pos.x == 0) {
            x = 48;
        }
        if (pos.x == 49) {
            x = 1;
        }
        if (pos.y == 0) {
            y = 48;
        }
        if (pos.y == 49) {
            y = 1;
        }
        return new RoomPosition(x, y, nextRoom);
    }
}