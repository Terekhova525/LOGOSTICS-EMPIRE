import type { Component } from '@/ecs/Component';

export class TargetComponent implements Component {
    public static readonly type = Symbol('TargetComponent');

    public readonly type = TargetComponent.type;

    public constructor(
        public x: number,
        public y: number
    ) {}
}