import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { PositionComponent } from '@/ecs/components/PositionComponent';
import { RenderComponent } from '@/rendering/ecs/RenderComponent';
import { CameraComponent } from '@/ecs/components/CameraComponent';

export class RenderSystem extends System {
    public update(
        world: World,
        _time: Time
    ): void {
        const cameraQuery = world.createQuery(CameraComponent);

        const cameraEntity = cameraQuery.execute()[0];

        const camera =
            cameraEntity !== undefined
                ? world.getComponent(
                    cameraEntity,
                    CameraComponent
                )
                : null;


        const query = world.createQuery(
            PositionComponent,
            RenderComponent
        );


        for (const entity of query.execute()) {
            const position = world.getComponent(
                entity,
                PositionComponent
            );

            const render = world.getComponent(
                entity,
                RenderComponent
            );


            if (
                position === null ||
                render === null
            ) {
                continue;
            }


            const x =
                position.x -
                (camera?.x ?? 0);

            const y =
                position.y -
                (camera?.y ?? 0);


            world.syncRender(
                entity.id,
                x,
                y,
                render.spriteId
            );
        }
    }
}