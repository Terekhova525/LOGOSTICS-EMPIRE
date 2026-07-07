import { System } from '@/ecs/System';
import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { CameraComponent } from '@/ecs/components/CameraComponent';
import { InputManager } from '@/input/InputManager';

export class CameraSystem extends System {
    public constructor(
        private readonly input: InputManager
    ) {
        super();
    }

    public update(
        world: World,
        _time: Time
    ): void {
        const query = world.createQuery(CameraComponent);

        for (const entity of query.execute()) {
            const camera = world.getComponent(
                entity,
                CameraComponent
            );

            if (camera === null) {
                continue;
            }

            if (this.input.mouse.isDown) {
                camera.x -= this.input.mouse.deltaX;
                camera.y -= this.input.mouse.deltaY;
            }

            this.input.mouse.resetDelta();
        }
    }
}