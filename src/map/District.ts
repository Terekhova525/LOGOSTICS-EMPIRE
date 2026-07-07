export enum DistrictType {
    Residential,
    Commercial,
    Industrial,
    Park
}

export class District {
    public constructor(
        public readonly id: number,
        public readonly type: DistrictType,
        public readonly minX: number,
        public readonly minY: number,
        public readonly maxX: number,
        public readonly maxY: number
    ) {}

    public contains(
        x: number,
        y: number
    ): boolean {
        return (
            x >= this.minX &&
            y >= this.minY &&
            x <= this.maxX &&
            y <= this.maxY
        );
    }
}