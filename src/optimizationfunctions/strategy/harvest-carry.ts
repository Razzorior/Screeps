import { MoveGoal } from "../goals/move-goal";
import { HarvestMineralGoal } from "../goals/harvest-mineral-goal";
import { ActionResult } from "../actions/action-result";
import { BuildGoal } from "../goals/build-goal";

export class HarvestAndCarryStrategy {

    public simulateAction(creep: Creep, mineral: Mineral, deposit: StructureSpawn): ActionResult {
        const moveParts = creep.body.filter(part => part.type == MOVE).length;
        const workParts = creep.body.filter(part => part.type == WORK).length;
        // moves to Mineral (or Ressource)
        let result = MoveGoal.simulateAction(creep.pos, moveParts, mineral.pos);
        // harvests Energy
        let harvestResult = HarvestMineralGoal.simulateAction(workParts, creep.carryCapacity, mineral.mineralAmount);
        result = result.add(harvestResult.result);
        // moves to Controller or Extension
        result = result.add(MoveGoal.simulateAction(mineral.pos, moveParts, deposit.pos));
        // deposits Energy
        return result.add(BuildGoal.simulateAction(workParts, harvestResult.obtainedEnergy, deposit.energyCapacity - deposit.energy));
    }
}