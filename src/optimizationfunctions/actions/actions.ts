import { ActionResult } from "./action-result";
import { Action } from "./action";

export const MOVE_ACTION = "move";
export const HARVESTPOWER_ACTION = "harvest_power";
export const HARVESTMINERALPOWER_ACTION = "harvest_mineral";
export const BUILD_ACTION = "build";
export const REPAIR_ACTION = "build";
export const DISMANTLE_ACTION = "build";
export const UPGRADE_ACTION = "build";
export const CARRY_ACTION = "carry";
export const ATTACK_ACTION = "build";
export const RANGEDATTACK_ACTION = "build";
export const RANGEDMASSATTACK_ACTION = "build";

export class Actions {
    public static results: { [action: string]: Action } = {
        "MOVE_ACTION": {
            requiredBodyPart: MOVE,
            result: new ActionResult(1, -2, 1, 0, 0)
        } as Action,
        "HARVESTPOWER_ACTION": {
            requiredBodyPart: WORK,
            result: new ActionResult(1, 0, 0, 2, 0)
        } as Action,
        "HARVESTMINERALPOWER_ACTION": {
            requiredBodyPart: WORK,
            result: new ActionResult(1, 0, 0, 1, 0)
        } as Action,
        "BUILD_ACTION": {
            requiredBodyPart: WORK,
            result: new ActionResult(1, 0, 0, -5, 5)
        } as Action,
    }
}