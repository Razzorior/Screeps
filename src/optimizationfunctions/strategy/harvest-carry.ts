import { MoveGoal } from "../goals/move-goal";
import { HarvestSourceGoal } from "../goals/harvest-source-goal";
import { ActionResult } from "../actions/action-result";
import { BuildGoal } from "../goals/build-goal";

export class HarvestAndCarryStrategy {

    public static simulateAction(creep: Creep, source: Source, deposit: StructureSpawn): ActionResult {
        const moveParts = creep.body.filter(part => part.type == MOVE).length;
        const workParts = creep.body.filter(part => part.type == WORK).length;
        // moves to Mineral (or Ressource)
        let result = MoveGoal.simulateAction(creep.pos, moveParts, source.pos);
        // harvests Energy
        let harvestResult = HarvestSourceGoal.simulateAction(workParts, creep.carryCapacity, source.energy);
        result = result.add(harvestResult.result);
        // moves to Controller or Extension
        result = result.add(MoveGoal.simulateAction(source.pos, moveParts, deposit.pos));
        // deposits Energy
        return result.add(BuildGoal.simulateAction(workParts, harvestResult.obtainedEnergy, deposit.energyCapacity - deposit.energy));
    }
}