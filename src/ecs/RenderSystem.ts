import { System } from '@/ecs/System';
import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { RenderComponent } from '@/rendering/ecs/RenderComponent';
import { PositionComponent } from '@/ecs/components/PositionComponent';

export class RenderSystem extends System {
    public update(world: World, _time: Time): void {
        const query = world.createQuery(RenderComponent, PositionComponent);

        for (const entity of query.execute()) {
            const render = world.getComponent(entity, RenderComponent);
            const pos = world.getComponent(entity, PositionComponent);

            if (!render || !pos) continue;

            world.syncRender(entity.id, pos.x, pos.y, render.spriteId);
        }
    }
}