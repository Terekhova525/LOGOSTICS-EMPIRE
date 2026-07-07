import type { Component } from '@/ecs/Component';

export class VehicleComponent implements Component {
    public static readonly type = Symbol('VehicleComponent');

    public readonly type = VehicleComponent.type;

    public constructor(
        public readonly maxSpeed: number
    ) {}
}