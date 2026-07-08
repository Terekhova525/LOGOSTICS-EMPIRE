import type { Component } from '@/ecs/Component';

export class BuildingEntranceComponent implements Component {

    public static readonly type =
        Symbol('BuildingEntranceComponent');

    public readonly type =
        BuildingEntranceComponent.type;

    public constructor(

        public readonly tileX: number,

        public readonly tileY: number

    ) {}

}