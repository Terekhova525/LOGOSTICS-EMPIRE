import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { CourierComponent } from '@/game/components/CourierComponent';
import { PositionComponent } from '@/ecs/components/PositionComponent';
import { VelocityComponent } from '@/game/components/VelocityComponent';
import { TargetComponent } from '@/game/components/TargetComponent';

export class CourierMovementSystem extends System {

    public update(
        world: World,
        time: Time
    ): void {

        const query = world.createQuery(
            CourierComponent,
            PositionComponent,
            VelocityComponent,
            TargetComponent
        );

        for (const entity of query.execute()) {

            const position = world.getComponent(
                entity,
                PositionComponent
            );

            const velocity = world.getComponent(
                entity,
                VelocityComponent
            );

            const target = world.getComponent(
                entity,
                TargetComponent
            );

            if (
                position === null ||
                velocity === null ||
                target === null
            ) {
                continue;
            }

            if (target === null) {
                continue;
            }

            velocity.x = 0;
            velocity.y = 0;
        }

    }

}