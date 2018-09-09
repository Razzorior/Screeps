import { Goal } from "./goal";
import { ActionResult } from "../actions/action-result";

export class HarvestSourceGoal extends Goal {

    public static simulateAction(workParts: number, carryCapacity: number, sourceEnergyAmount: number): { result: ActionResult, obtainedEnergy: number } {
        if (workParts == 0) {
            return { result: ActionResult.noProgress, obtainedEnergy: 0 };
        }
        const obtainableEnergy = Math.min(carryCapacity, sourceEnergyAmount);
        const obtainPerTick = workParts * 1;
        const times = Math.ceil(obtainableEnergy / obtainPerTick);
        return { result: new ActionResult(times, 0, 0, obtainableEnergy, 0), obtainedEnergy: obtainableEnergy };
    }
}