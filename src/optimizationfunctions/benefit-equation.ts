import { Rational } from "../quantity/rational";
import { ActionResult } from "./actions/action-result";

export class BenefitEquation {
    static calculateBenefit(executedAction: ActionResult): Rational {
        const energyBenefit: number = executedAction.availableEnergy;
        return new Rational(energyBenefit, executedAction.time);
    }
}