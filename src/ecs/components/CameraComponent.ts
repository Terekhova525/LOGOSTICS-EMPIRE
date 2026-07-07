import type { Component } from '@/ecs/Component';

export class CameraComponent implements Component {
    public static readonly type: symbol = Symbol('CameraComponent');

    public readonly type: symbol = CameraComponent.type;

    public x = 0;

    public y = 0;

    public zoom = 1;
}