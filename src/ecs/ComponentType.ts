import type { Component } from '@/ecs/Component';

export interface ComponentConstructor<TComponent extends Component> {
    readonly type: symbol;

    new (...args: readonly never[]): TComponent;
}