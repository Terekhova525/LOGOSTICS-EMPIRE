import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { CourierComponent } from '@/game/components/CourierComponent';
import { TargetComponent } from '@/game/components/TargetComponent';

import { OrderComponent } from '@/game/components/OrderComponent';

export class OrderAssignSystem extends System {

    public update(
        world: World,
        _time: Time
    ): void {

        const couriers =
            world.createQuery(
                CourierComponent,
                TargetComponent
            ).execute();

        const orders =
            world.createQuery(
                OrderComponent
            ).execute();

        for (const courier of couriers) {

            const target =
                world.getComponent(
                    courier,
                    TargetComponent
                );

            if (
                target === null ||
                target.target !== null
            ) {
                continue;
            }

            for (const order of orders) {

                const component =
                    world.getComponent(
                        order,
                        OrderComponent
                    );

                if (
                    component === null ||
                    component.assigned
                ) {
                    continue;
                }

                component.assigned = true;

                target.target = order;

                console.log(
                    'Order assigned.'
                );

                break;
            }

        }

    }

}