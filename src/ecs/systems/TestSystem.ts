import { System } from '@/ecs/System';
import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';
import { PositionComponent } from '@/ecs/components/PositionComponent';

export class TestSystem extends System {
    public update(world: World, time: Time): void {
        const query = world.createQuery(PositionComponent);

        const entities = query.execute();

        for (const entity of entities) {
            const pos = world.getComponent(entity, PositionComponent);

            if (pos === null) {
                continue;
            }

            pos.x += 10 * time.getDeltaTime();
            pos.y += 5 * time.getDeltaTime();
        }
    }
}