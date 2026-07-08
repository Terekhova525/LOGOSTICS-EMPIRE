import type { Component } from '@/ecs/Component';

export class OrderComponent implements Component {

    public static readonly type =
        Symbol('OrderComponent');

    public readonly type =
        OrderComponent.type;

    public assigned = false;

    public pickedUp = false;

}