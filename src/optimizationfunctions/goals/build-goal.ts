import { Goal } from "./goal";
import { ActionResult } from "../actions/action-result";

export class BuildGoal extends Goal {

    public static simulateAction(workParts: number, carriedEnergy: number, freeEnergySpace: number): ActionResult {
        if (workParts == 0) {
            return ActionResult.noProgress;
        }
        const storableEnergy = Math.min(freeEnergySpace, carriedEnergy);
        const storePerTicks = 5 * workParts;
        const times = Math.ceil(storableEnergy / storePerTicks);
        return new ActionResult(times, 0, 0, carriedEnergy - storableEnergy, storableEnergy);
    }

}