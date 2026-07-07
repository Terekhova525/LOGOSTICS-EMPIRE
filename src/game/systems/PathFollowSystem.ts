import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { CourierComponent } from '@/game/components/CourierComponent';
import { PositionComponent } from '@/ecs/components/PositionComponent';
import { VelocityComponent } from '@/game/components/VelocityComponent';
import { PathComponent } from '@/game/components/PathComponent';

import { CoordinateConverter } from '@/navigation/CoordinateConverter';

export class PathFollowSystem extends System {

    public update(
        world: World,
        _time: Time
    ): void {

        const query = world.createQuery(
            CourierComponent,
            PositionComponent,
            VelocityComponent,
            PathComponent
        );

        for (const entity of query.execute()) {

            const position =
                world.getComponent(entity, PositionComponent);

            const velocity =
                world.getComponent(entity, VelocityComponent);

            const path =
                world.getComponent(entity, PathComponent);

            if (
                position === null ||
                velocity === null ||
                path === null
            ) {
                continue;
            }

            const node =
                path.nodes[path.currentIndex];

            if (node === undefined) {

                velocity.x = 0;
                velocity.y = 0;

                continue;
            }

            const targetX =
                CoordinateConverter.tileCenterX(
                    node.x
                );

            const targetY =
                CoordinateConverter.tileCenterY(
                    node.y
                );

            const dx =
                targetX - position.x;

            const dy =
                targetY - position.y;

            const distance =
                Math.hypot(
                    dx,
                    dy
                );

            if (distance < 3) {

                path.currentIndex++;

                continue;
            }

            const speed = 70;

            velocity.x =
                dx / distance * speed;

            velocity.y =
                dy / distance * speed;
        }

    }

}