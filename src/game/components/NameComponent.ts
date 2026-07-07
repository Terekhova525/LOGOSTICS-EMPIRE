import type { Component } from '@/ecs/Component';

export class NameComponent implements Component {
    public static readonly type = Symbol('NameComponent');

    public readonly type = NameComponent.type;

    public constructor(
        public readonly value: string
    ) {}
}