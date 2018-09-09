export class ActionResult {
    public static noProgress = new ActionResult(0, 0, 0, 0, 0);

    public constructor(
        public readonly time: number,
        public readonly fatigue: number,
        public readonly distanceToTarget: number,
        public readonly carriedEnergy: number,
        public readonly availableEnergy: number,
    ) { }
    add(result: ActionResult): ActionResult {
        return new ActionResult(
            this.time + result.time,
            this.fatigue + result.fatigue,
            this.distanceToTarget + result.distanceToTarget,
            this.carriedEnergy + result.carriedEnergy,
            this.availableEnergy + result.availableEnergy,
        );
    }
}