import type { Component } from '@/ecs/Component';

export class RoadComponent implements Component {
    public static readonly type = Symbol('RoadComponent');

    public readonly type = RoadComponent.type;

    public constructor(
        public readonly speedLimit: number
    ) {}
}