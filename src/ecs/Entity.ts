import type { EntityId } from '@/ecs/EntityId';

export class Entity {
    public readonly id: EntityId;

    public constructor(id: EntityId) {
        this.id = id;
    }
}