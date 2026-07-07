import type { Component } from '@/ecs/Component';

import { DistrictType } from '@/map/District';

export class DistrictComponent implements Component {
    public static readonly type = Symbol('DistrictComponent');

    public readonly type = DistrictComponent.type;

    public constructor(
        public readonly districtId: number,
        public readonly districtType: DistrictType
    ) {}
}