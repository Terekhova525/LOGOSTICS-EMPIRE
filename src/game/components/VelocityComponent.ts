import type { Component } from '@/ecs/Component';

export class VelocityComponent implements Component {
    public static readonly type = Symbol('VelocityComponent');

    public readonly type = VelocityComponent.type;

    public constructor(
        public x = 0,
        public y = 0
    ) {}
}