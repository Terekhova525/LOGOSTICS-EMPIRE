import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { Entity } from '@/ecs/Entity';

import { PositionComponent } from '@/ecs/components/PositionComponent';
import { RenderComponent } from '@/rendering/ecs/RenderComponent';

import { BuildingComponent } from '@/map/components/BuildingComponent';
import { BuildingRegistry } from '@/map/BuildingRegistry';
import { BuildingType } from '@/map/BuildingType';

export class BuildingBootstrapSystem extends System {

    private initialized = false;

    public constructor(
        private readonly registry: BuildingRegistry,
        private readonly tileSize: number = 32
    ) {
        super();
    }

    public update(
        world: World,
        _time: Time
    ): void {

        if (this.initialized) {
            return;
        }

        this.initialized = true;

        for (let y = 0; y < 40; y++) {
            for (let x = 0; x < 40; x++) {

                const type = this.registry.get(x, y);

                if (type === undefined) {
                    continue;
                }

                const entity: Entity = world.createEntity();

                world.addComponent(
                    entity,
                    new PositionComponent(
                        x * this.tileSize + this.tileSize * 0.5,
                        y * this.tileSize + this.tileSize * 0.5
                    )
                );

                world.addComponent(
                    entity,
                    new BuildingComponent(
                        type,
                        x,
                        y
                    )
                );

                world.addComponent(
                    entity,
                    new RenderComponent(
                        this.spriteId(type)
                    )
                );
            }
        }
    }

    private spriteId(
        type: BuildingType
    ): string {

        switch (type) {
            case BuildingType.Residential:
                return 'building.residential';

            case BuildingType.Commercial:
                return 'building.commercial';

            case BuildingType.Industrial:
                return 'building.industrial';
        }
    }
}