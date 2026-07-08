import type { Component } from '@/ecs/Component';

export class OrderTargetComponent implements Component {

    public static readonly type =
        Symbol('OrderTargetComponent');

    public readonly type =
        OrderTargetComponent.type;

    public constructor(

        public readonly x: number,

        public readonly y: number

    ) {}

}