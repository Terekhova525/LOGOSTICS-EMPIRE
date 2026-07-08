import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { PositionComponent } from '@/ecs/components/PositionComponent';

import { CourierComponent } from '@/game/components/CourierComponent';
import { TargetComponent } from '@/game/components/TargetComponent';
import { PathComponent } from '@/game/components/PathComponent';
import { OrderTargetComponent } from '@/game/components/OrderTargetComponent';

import { NavigationService } from '@/navigation/NavigationService';
import { Pathfinder } from '@/navigation/Pathfinder';
import { CoordinateConverter } from '@/navigation/CoordinateConverter';

export class PathRequestSystem extends System {

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
                target === null ||
                target.target === null
            ) {
                continue;
            }


            const orderTarget =
                world.getComponent(
                    target.target,
                    OrderTargetComponent
                );


            if (
                orderTarget === null
            ) {
                continue;
            }


            const existingPath =
                world.getComponent(
                    entity,
                    PathComponent
                );


            if (
                existingPath !== null
            ) {
                continue;
            }


            const start =
                this.navigation.findNearestNode(
                    CoordinateConverter.worldToTileX(
                        position.x
                    ),
                    CoordinateConverter.worldToTileY(
                        position.y
                    )
                );


            const end =
                this.navigation.findNearestNode(
                    CoordinateConverter.worldToTileX(
                        orderTarget.x
                    ),
                    CoordinateConverter.worldToTileY(
                        orderTarget.y
                    )
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


            world.addComponent(
                entity,
                path
            );


            console.log(
                'Generated path:',
                path.nodes.length
            );

        }

    }

}