import { TileType } from '@/map/TileType';
import { WorldGrid } from '@/map/WorldGrid';

export class ParkGenerator {

    public generate(grid: WorldGrid): void {

        const radius = 3;

        for (let cy = 6; cy < grid.height; cy += 14) {
            for (let cx = 6; cx < grid.width; cx += 14) {

                for (let y = cy - radius; y <= cy + radius; y++) {
                    for (let x = cx - radius; x <= cx + radius; x++) {

                        if (!grid.contains(x, y)) {
                            continue;
                        }

                        if (grid.get(x, y) === TileType.Road) {
                            continue;
                        }

                        const dx = x - cx;
                        const dy = y - cy;

                        if (dx * dx + dy * dy <= radius * radius) {
                            grid.set(x, y, TileType.Park);
                        }
                    }
                }

            }
        }

    }

}