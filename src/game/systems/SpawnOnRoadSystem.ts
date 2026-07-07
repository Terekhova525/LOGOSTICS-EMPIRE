import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { PositionComponent } from '@/ecs/components/PositionComponent';
import { CourierComponent } from '@/game/components/CourierComponent';

import { NavigationService } from '@/navigation/NavigationService';
import { CoordinateConverter } from '@/navigation/CoordinateConverter';

export class SpawnOnRoadSystem extends System {

    private initialized = false;

    public constructor(
        private readonly navigation: NavigationService
    ) {
        super();
    }

    public update(
        world: World,
        _time: Time
    ): void {

        if (
            this.initialized
        ) {
            return;
        }

        this.initialized = true;

        const query =
            world.createQuery(
                CourierComponent,
                PositionComponent
            );

        for (
            const entity
            of query.execute()
        ) {

            const position =
                world.getComponent(
                    entity,
                    PositionComponent
                );

            if (
                position === null
            ) {
                continue;
            }

            const road =
                this.navigation
                    .getRandomRoadNode();

            position.x =
                CoordinateConverter.tileCenterX(
                    road.x
                );

            position.y =
                CoordinateConverter.tileCenterY(
                    road.y
                );

        }

    }

}