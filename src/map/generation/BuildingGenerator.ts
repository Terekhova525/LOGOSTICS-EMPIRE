import { BuildingRegistry } from '@/map/BuildingRegistry';
import { BuildingType } from '@/map/BuildingType';
import { TileType } from '@/map/TileType';
import { WorldGrid } from '@/map/WorldGrid';

export class BuildingGenerator {

    private readonly registry =
        new BuildingRegistry();

    public generate(grid: WorldGrid): void {

        this.registry.clear();

        for (const tile of grid.getTiles()) {

            if (tile.type !== TileType.Building) {
                continue;
            }

            const noise =
                (tile.x * 17 + tile.y * 31) % 100;

            let type: BuildingType;

            if (noise < 55) {
                type = BuildingType.Residential;
            }
            else if (noise < 85) {
                type = BuildingType.Commercial;
            }
            else {
                type = BuildingType.Industrial;
            }

            this.registry.set(
                tile.x,
                tile.y,
                type
            );
        }

    }

    public getRegistry(): BuildingRegistry {

        return this.registry;

    }

}