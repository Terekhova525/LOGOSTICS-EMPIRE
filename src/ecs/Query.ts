import type { Component } from '@/ecs/Component';
import type { ComponentConstructor } from '@/ecs/ComponentType';
import { Entity } from '@/ecs/Entity';
import type { EntityManager } from '@/ecs/EntityManager';
import type { ComponentStore } from '@/ecs/ComponentStore';

export class Query {
    private readonly entityManager: EntityManager;

    private readonly componentStore: ComponentStore;

    private readonly componentTypes: readonly ComponentConstructor<Component>[];

    public constructor(
        entityManager: EntityManager,
        componentStore: ComponentStore,
        componentTypes: readonly ComponentConstructor<Component>[]
    ) {
        this.entityManager = entityManager;
        this.componentStore = componentStore;
        this.componentTypes = componentTypes;
    }

    public execute(): readonly Entity[] {
        const result: Entity[] = [];

        for (const entity of this.entityManager.getAll()) {
            let valid = true;

            for (const componentType of this.componentTypes) {
                if (!this.componentStore.has(entity.id, componentType)) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                result.push(entity);
            }
        }

        return result;
    }
}