import type { Component } from '@/ecs/Component';
import type { ComponentConstructor } from '@/ecs/ComponentType';
import type { EntityId } from '@/ecs/EntityId';

export class ComponentStore {
    private readonly stores = new Map<
        symbol,
        Map<EntityId, Component>
    >();

    public add<TComponent extends Component>(
        entity: EntityId,
        component: TComponent
    ): void {
        let components = this.stores.get(component.type);

        if (components === undefined) {
            components = new Map<EntityId, Component>();

            this.stores.set(component.type, components);
        }

        components.set(entity, component);
    }

    public get<TComponent extends Component>(
        entity: EntityId,
        componentType: ComponentConstructor<TComponent>
    ): TComponent | null {
        const components = this.stores.get(componentType.type);

        if (components === undefined) {
            return null;
        }

        const component = components.get(entity);

        if (component === undefined) {
            return null;
        }

        return component as TComponent;
    }

    public has<TComponent extends Component>(
        entity: EntityId,
        componentType: ComponentConstructor<TComponent>
    ): boolean {
        const components = this.stores.get(componentType.type);

        return components?.has(entity) ?? false;
    }

    public remove<TComponent extends Component>(
        entity: EntityId,
        componentType: ComponentConstructor<TComponent>
    ): void {
        this.stores.get(componentType.type)?.delete(entity);
    }

    public clear(): void {
        this.stores.clear();
    }
}