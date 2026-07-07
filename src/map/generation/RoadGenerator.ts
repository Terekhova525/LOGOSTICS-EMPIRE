import { TileType } from '@/map/TileType';
import { WorldGrid } from '@/map/WorldGrid';

export class RoadGenerator {
    public generate(
        grid: WorldGrid
    ): void {
        const centerX = Math.floor(grid.width / 2);
        const centerY = Math.floor(grid.height / 2);

        for (let x = 0; x < grid.width; x++) {
            grid.set(
                x,
                centerY,
                TileType.Road
            );
        }

        for (let y = 0; y < grid.height; y++) {
            grid.set(
                centerX,
                y,
                TileType.Road
            );
        }
    }
}