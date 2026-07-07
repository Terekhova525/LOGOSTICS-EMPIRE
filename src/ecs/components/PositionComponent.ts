import type { Component } from '@/ecs/Component';

export class PositionComponent implements Component {
    public static readonly type: symbol = Symbol('PositionComponent');

    public readonly type: symbol = PositionComponent.type;

    public x: number;
    public y: number;

    public constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}