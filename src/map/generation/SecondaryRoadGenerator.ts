import { TileType } from '@/map/TileType';
import { WorldGrid } from '@/map/WorldGrid';

export class SecondaryRoadGenerator {
    public generate(grid: WorldGrid): void {
        const step = 8;

        for (let x = step; x < grid.width; x += step) {
            for (let y = 0; y < grid.height; y++) {
                if (grid.get(x, y) === TileType.Empty) {
                    grid.set(x, y, TileType.Road);
                }
            }
        }

        for (let y = step; y < grid.height; y += step) {
            for (let x = 0; x < grid.width; x++) {
                if (grid.get(x, y) === TileType.Empty) {
                    grid.set(x, y, TileType.Road);
                }
            }
        }
    }
}