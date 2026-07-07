import type { Component } from '@/ecs/Component';

export class TagComponent implements Component {
    public static readonly type = Symbol('TagComponent');

    public readonly type = TagComponent.type;

    public constructor(
        public readonly tag: string
    ) {}
}