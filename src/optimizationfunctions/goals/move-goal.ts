import { Goal } from "./goal";
import { ActionResult } from "../actions/action-result";
import { Actions } from "../actions/actions";
import { Action } from "../actions/action";

export class MoveGoal extends Goal {

    public static simulateAction(from: RoomPosition, moveParts: number, to: RoomPosition): ActionResult {
        if (moveParts == 0) {
            return ActionResult.noProgress;
        }
        const movePerTick = moveParts * 1;
        const distance = this.calculatedDistance(from, to);
        const times = Math.ceil(distance / movePerTick);
        return new ActionResult(times, -2 * times, 1 * times, 0, 0);
    }

    public static calculatedDistance(from: RoomPosition, to: RoomPosition): number {
        return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
    }
}