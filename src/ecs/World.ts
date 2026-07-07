import type { Time } from '@/engine/time/Time';

import type { Component } from '@/ecs/Component';
import type { ComponentConstructor } from '@/ecs/ComponentType';
import { ComponentStore } from '@/ecs/ComponentStore';
import { CommandBuffer } from '@/ecs/CommandBuffer';
import { Entity } from '@/ecs/Entity';
import { EntityManager } from '@/ecs/EntityManager';
import { Query } from '@/ecs/Query';
import { System } from '@/ecs/System';

export class World {
    private readonly entityManager = new EntityManager();

    private readonly componentStore = new ComponentStore();

    private readonly commandBuffer = new CommandBuffer();

    private readonly systems: System[] = [];

    private renderSync?:
        (id: number, x: number, y: number, spriteId: string) => void;

    private tileSync?:
        (x: number, y: number, tileType: number) => void;

    public setRenderSync(
        fn: (
            id: number,
            x: number,
            y: number,
            spriteId: string
        ) => void
    ): void {
        this.renderSync = fn;
    }

    public setTileSync(
        fn: (
            x: number,
            y: number,
            tileType: number
        ) => void
    ): void {
        this.tileSync = fn;
    }

    public syncRender(
        id: number,
        x: number,
        y: number,
        spriteId: string
    ): void {
        this.renderSync?.(id, x, y, spriteId);
    }

    public syncTile(
        x: number,
        y: number,
        tileType: number
    ): void {
        this.tileSync?.(
            x,
            y,
            tileType
        );
    }

    public createEntity(): Entity {
        return this.entityManager.create();
    }

    public destroyEntity(entity: Entity): void {
        this.entityManager.destroy(entity);
    }

    public addComponent<TComponent extends Component>(
        entity: Entity,
        component: TComponent
    ): void {
        this.componentStore.add(
            entity.id,
            component
        );
    }

    public getComponent<TComponent extends Component>(
        entity: Entity,
        component: ComponentConstructor<TComponent>
    ): TComponent | null {
        return this.componentStore.get(
            entity.id,
            component
        );
    }

    public createQuery(
        ...components: readonly ComponentConstructor<Component>[]
    ): Query {
        return new Query(
            this.entityManager,
            this.componentStore,
            components
        );
    }

    public addSystem(system: System): void {
        this.systems.push(system);
    }

    public update(time: Time): void {
        for (const system of this.systems) {
            system.update(
                this,
                time
            );
        }

        this.commandBuffer.flush();
    }

    public clear(): void {
        this.commandBuffer.clear();

        this.componentStore.clear();

        this.entityManager.clear();

        this.systems.length = 0;
    }
}