import { TileType } from '@/map/TileType';
import { WorldGrid } from '@/map/WorldGrid';

export class DistrictGenerator {
    public generate(grid: WorldGrid): void {
        for (let y = 0; y < grid.height; y++) {
            for (let x = 0; x < grid.width; x++) {

                if (grid.get(x, y) !== TileType.Empty) {
                    continue;
                }

                const noise =
                    (x * 37 + y * 53) % 100;

                if (noise < 18) {
                    grid.set(x, y, TileType.Park);
                } else {
                    grid.set(x, y, TileType.Building);
                }
            }
        }
    }
}