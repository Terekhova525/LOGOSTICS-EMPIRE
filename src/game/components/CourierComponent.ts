import type { Component } from '@/ecs/Component';

export class CourierComponent implements Component {
    public static readonly type = Symbol('CourierComponent');

    public readonly type = CourierComponent.type;
}