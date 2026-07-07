import { Entity } from '@/ecs/Entity';
import type { EntityId } from '@/ecs/EntityId';

export class EntityManager {
    private nextId = 1;

    private readonly entities = new Map<EntityId, Entity>();

    public create(): Entity {
        const entity = new Entity(this.nextId++);

        this.entities.set(entity.id, entity);

        return entity;
    }

    public destroy(entity: Entity): void {
        this.entities.delete(entity.id);
    }

    public has(entity: Entity): boolean {
        return this.entities.has(entity.id);
    }

    public getAll(): readonly Entity[] {
        return [...this.entities.values()];
    }

    public clear(): void {
        this.entities.clear();

        this.nextId = 1;
    }
}