import type { Time } from '@/engine/time/Time';

import type { World } from '@/ecs/World';

export abstract class System {
    public abstract update(
        world: World,
        time: Time
    ): void;
}