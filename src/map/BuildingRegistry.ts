import { BuildingType } from '@/map/BuildingType';

export class BuildingRegistry {

    private readonly buildings =
        new Map<string, BuildingType>();

    public clear(): void {
        this.buildings.clear();
    }

    public set(
        x: number,
        y: number,
        type: BuildingType
    ): void {
        this.buildings.set(
            `${x}:${y}`,
            type
        );
    }

    public get(
        x: number,
        y: number
    ): BuildingType | undefined {
        return this.buildings.get(
            `${x}:${y}`
        );
    }

}