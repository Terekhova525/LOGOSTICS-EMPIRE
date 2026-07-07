import type { Component } from '@/ecs/Component';

export class PlayerComponent implements Component {
    public static readonly type = Symbol('PlayerComponent');

    public readonly type = PlayerComponent.type;
}