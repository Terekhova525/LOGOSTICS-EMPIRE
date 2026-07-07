import type { Component } from '@/ecs/Component';

import { BuildingType } from '@/map/BuildingType';

export class BuildingComponent implements Component {
    public static readonly type = Symbol('BuildingComponent');

    public readonly type = BuildingComponent.type;

    public constructor(
        public readonly buildingType: BuildingType,
        public readonly gridX: number,
        public readonly gridY: number
    ) {}
}