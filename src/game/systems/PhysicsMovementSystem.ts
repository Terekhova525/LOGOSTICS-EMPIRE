import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { PositionComponent } from '@/ecs/components/PositionComponent';
import { VelocityComponent } from '@/game/components/VelocityComponent';

export class PhysicsMovementSystem extends System {

    public update(
        world: World,
        time: Time
    ): void {

        const query = world.createQuery(
            PositionComponent,
            VelocityComponent
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

            if (
                position === null ||
                velocity === null
            ) {
                continue;
            }

            position.x +=
                velocity.x * time.getDeltaTime();

            position.y +=
                velocity.y * time.getDeltaTime();
        }

    }

}