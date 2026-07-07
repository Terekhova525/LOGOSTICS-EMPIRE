import type { Component } from '@/ecs/Component';

import { TileType } from '@/map/TileType';

export class TileComponent implements Component {
    public static readonly type = Symbol('TileComponent');

    public readonly type = TileComponent.type;

    public constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly tileType: TileType
    ) {}
}