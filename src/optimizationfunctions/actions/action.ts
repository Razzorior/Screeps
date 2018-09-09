import { ActionResult } from "./action-result";

export interface Action {
    requiredBodyPart: BodyPartConstant;
    result: ActionResult;
}