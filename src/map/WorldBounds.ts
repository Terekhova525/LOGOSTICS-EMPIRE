export class WorldBounds {
    public constructor(
        public readonly width: number,
        public readonly height: number
    ) {}

    public contains(
        x: number,
        y: number
    ): boolean {
        return (
            x >= 0 &&
            y >= 0 &&
            x < this.width &&
            y < this.height
        );
    }
}