import { World } from '@/ecs/World';
import type { Time } from '@/engine/time/Time';

import { MovementDebugSystem } from '@/game/systems/MovementDebugSystem';
import { RenderSystem } from '@/rendering/ecs/RenderSystem';
import { CameraSystem } from '@/game/systems/CameraSystem';

import { PositionComponent } from '@/ecs/components/PositionComponent';
import { CameraComponent } from '@/ecs/components/CameraComponent';

import { RenderComponent } from '@/rendering/ecs/RenderComponent';

import { InputManager } from '@/input/InputManager';

import { WorldGrid } from '@/map/WorldGrid';
import { CityGenerator } from '@/map/generation/CityGenerator';
import { MapRenderSystem } from '@/map/systems/MapRenderSystem';

import { PixiRenderer } from '@/rendering/pixi/PixiRenderer';

import { BuildingBootstrapSystem } from '@/map/systems/BuildingBootstrapSystem';

import { PlayerComponent } from '@/game/components/PlayerComponent';
import { VelocityComponent } from '@/game/components/VelocityComponent';

import { CourierComponent } from '@/game/components/CourierComponent';
import { TargetComponent } from '@/game/components/TargetComponent';

import { PhysicsMovementSystem } from '@/game/systems/PhysicsMovementSystem';

import { PathRequestSystem } from '@/game/systems/PathRequestSystem';

import { PathFollowSystem } from '@/game/systems/PathFollowSystem';

import { RoadGraphBuilder } from '@/navigation/RoadGraphBuilder';
import { NavigationService } from '@/navigation/NavigationService';
import { Pathfinder } from '@/navigation/Pathfinder';

import { SpawnOnRoadSystem } from '@/game/systems/SpawnOnRoadSystem';

import { OrderSpawnSystem } from '@/game/systems/OrderSpawnSystem';

import { OrderAssignSystem } from '@/game/systems/OrderAssignSystem';

import { BuildingEntranceSystem } from '@/map/systems/BuildingEntranceSystem';

export class GameWorld {
    private readonly world: World;

    private readonly grid: WorldGrid;

    public constructor(world: World) {
        this.world = world;

        this.grid = new WorldGrid(40, 40);

        const city = new CityGenerator();

        city.generate(this.grid);

        const roadGraph =
            new RoadGraphBuilder().build(
                this.grid
            );

        const navigation =
            new NavigationService(
                roadGraph
            );

        const pathfinder =
            new Pathfinder(
                roadGraph
            );

        const courier = this.world.createEntity();

        this.world.addComponent(
            courier,
            new PlayerComponent()
        );

        this.world.addComponent(
            courier,
            new CourierComponent()
        );

        this.world.addComponent(
            courier,
            new PositionComponent(
                100,
                100
            )
        );

        this.world.addComponent(
            courier,
            new VelocityComponent(
                30,
                0
            )
        );

        this.world.addComponent(
            courier,
            new TargetComponent()
        );

        this.world.addComponent(
            courier,
            new RenderComponent(
                'courier'
            )
        );

        const camera = this.world.createEntity();

        this.world.addComponent(
            camera,
            new CameraComponent()
        );

        this.world.addSystem(
            new SpawnOnRoadSystem(
                navigation
            )
        );

        this.world.addSystem(
            new PathRequestSystem(
                navigation,
                pathfinder
            )
        );

        this.world.addSystem(
            new PathFollowSystem()
        );

        this.world.addSystem(
            new PhysicsMovementSystem()
        );

        this.world.addSystem(
            new MapRenderSystem(this.grid)
        );

        this.world.addSystem(
            new BuildingBootstrapSystem(
                city.getBuildingRegistry()
            )
        );

        this.world.addSystem(
            new BuildingEntranceSystem()
        );

        this.world.addSystem(
            new OrderSpawnSystem()
        );

        this.world.addSystem(
            new OrderAssignSystem()
        );

        this.world.addSystem(
            new RenderSystem()
        );
    }

    public attachRenderer(
        renderer: PixiRenderer
    ): void {
        this.world.setRenderSync(
            (
                id,
                x,
                y,
                spriteId
            ) => {
                renderer.updateEntity(
                    id,
                    x,
                    y,
                    spriteId
                );
            }
        );

        this.world.setTileSync(
            (
                x,
                y,
                tileType
            ) => {
                renderer.updateTile(
                    x,
                    y,
                    tileType
                );
            }
        );
    }

    public attachInput(
        input: InputManager
    ): void {
        this.world.addSystem(
            new CameraSystem(input)
        );
    }

    public update(
        time: Time
    ): void {
        this.world.update(time);
    }
}