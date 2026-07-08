import type { Component } from '@/ecs/Component';
import { Entity } from '@/ecs/Entity';

export class TargetComponent implements Component {

    public static readonly type =
        Symbol('TargetComponent');

    public readonly type =
        TargetComponent.type;

    public constructor(
        public target: Entity | null = null
    ) {}

}