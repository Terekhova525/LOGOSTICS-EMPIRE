import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { WorldGrid } from '@/map/WorldGrid';


export class MapRenderSystem extends System {

    public constructor(
        private readonly grid: WorldGrid
    ) {
        super();
    }


    public update(
        world: World,
        _time: Time
    ): void {

        for (const tile of this.grid.getTiles()) {

            if (tile.type === 0) {
                continue;
            }


            world.syncTile(
                tile.x,
                tile.y,
                tile.type
            );
        }
    }
}