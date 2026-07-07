import type { Component } from '@/ecs/Component';

import { RoadNode } from '@/navigation/RoadNode';

export class PathComponent implements Component {

    public static readonly type =
        Symbol('PathComponent');

    public readonly type =
        PathComponent.type;

    public readonly nodes: RoadNode[] = [];

    public currentIndex = 0;

}