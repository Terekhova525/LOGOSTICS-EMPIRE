import { System } from '@/ecs/System';

import type { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { BuildingComponent } from '@/map/components/BuildingComponent';
import { BuildingEntranceComponent } from '@/map/components/BuildingEntranceComponent';


export class BuildingEntranceSystem extends System {

    public update(
        world: World,
        _time: Time
    ): void {

        const buildings =
            world.createQuery(
                BuildingComponent
            ).execute();


        for (const building of buildings) {

            if (
                world.getComponent(
                    building,
                    BuildingEntranceComponent
                ) !== null
            ) {
                continue;
            }


            const data =
                world.getComponent(
                    building,
                    BuildingComponent
                );


            if (data === null) {
                continue;
            }


            /*
                Пока простая логика:

                вход = клетка слева от здания
            */

            world.addComponent(
                building,
                new BuildingEntranceComponent(
                    data.tileX - 1,
                    data.tileY
                )
            );

        }

    }

}