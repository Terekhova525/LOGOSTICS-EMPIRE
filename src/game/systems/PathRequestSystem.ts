import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { PositionComponent } from '@/ecs/components/PositionComponent';

import { CourierComponent } from '@/game/components/CourierComponent';
import { TargetComponent } from '@/game/components/TargetComponent';
import { PathComponent } from '@/game/components/PathComponent';

import { NavigationService } from '@/navigation/NavigationService';
import { Pathfinder } from '@/navigation/Pathfinder';
import { CoordinateConverter } from '@/navigation/CoordinateConverter';

export class PathRequestSystem extends System {

    private initialized = false;

    public constructor(
        private readonly navigation: NavigationService,
        private readonly pathfinder: Pathfinder
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

        const query = world.createQuery(
            CourierComponent,
            PositionComponent,
            TargetComponent
        );

        for (const entity of query.execute()) {

            const position =
                world.getComponent(
                    entity,
                    PositionComponent
                );

            const target =
                world.getComponent(
                    entity,
                    TargetComponent
                );

            if (
                position === null ||
                target === null
            ) {
                continue;
            }

            const start =
                this.navigation.findNearestNode(
                    CoordinateConverter.worldToTileX(position.x),
                    CoordinateConverter.worldToTileY(position.y)
                );

            const end =
                this.navigation.findNearestNode(
                    CoordinateConverter.worldToTileX(target.x),
                    CoordinateConverter.worldToTileY(target.y)
                );

            if (
                start === null ||
                end === null
            ) {
                continue;
            }

            const path =
                new PathComponent();

            path.nodes.push(
                ...this.pathfinder.find(
                    start,
                    end
                )
            );

            console.log(
                'Generated path:',
                path.nodes.length
            );

            world.addComponent(
                entity,
                path
            );
        }
    }

}