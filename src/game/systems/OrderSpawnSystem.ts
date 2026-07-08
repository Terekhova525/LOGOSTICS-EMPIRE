import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { BuildingComponent } from '@/map/components/BuildingComponent';

import { PositionComponent } from '@/ecs/components/PositionComponent';

import { OrderComponent } from '@/game/components/OrderComponent';
import { RenderComponent } from '@/rendering/ecs/RenderComponent';

import { BuildingEntranceComponent } from '@/map/components/BuildingEntranceComponent';
import { OrderTargetComponent } from '@/game/components/OrderTargetComponent';

export class OrderSpawnSystem extends System {

    private spawned = false;

    public update(
        world: World,
        _time: Time
    ): void {

        if (this.spawned) {
            return;
        }

        this.spawned = true;

        const buildings =
            world.createQuery(
                BuildingComponent
            ).execute();

        if (buildings.length === 0) {
            return;
        }

        const building =
            buildings[0];

        if (building === undefined) {
            return;
        }

        const component =
            world.getComponent(
                building,
                BuildingComponent
            );

        if (component === null) {
            return;
        }

        const entrance =
            world.getComponent(
                building,
                BuildingEntranceComponent
            );


        if (entrance === null) {
            return;
        }

        const order =
            world.createEntity();

        world.addComponent(
            order,
            new OrderComponent()
        );

        const orderX =
            component.tileX * 32 + 16;

        const orderY =
            component.tileY * 32 + 16;


        world.addComponent(
            order,
            new PositionComponent(
                orderX,
                orderY
            )
        );

        world.addComponent(
            order,
            new OrderTargetComponent(
                entrance.tileX * 32 + 16,
                entrance.tileY * 32 + 16
            )
        );

        world.addComponent(
            order,
            new RenderComponent(
                'order'
            )
        );

        console.log(
            'Order spawned.'
        );

    }

}