import type { Component } from '@/ecs/Component';

export class RenderComponent implements Component {
    public static readonly type: symbol = Symbol('RenderComponent');
    public readonly type: symbol = RenderComponent.type;

    public spriteId: string;

    public constructor(spriteId: string) {
        this.spriteId = spriteId;
    }
}