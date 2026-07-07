import { Engine } from '@/engine/Engine';
import { PixiRenderer } from '@/rendering/pixi/PixiRenderer';
import { World } from '@/ecs/World';
import { GameWorld } from '@/game/GameWorld';
import { InputManager } from '@/input/InputManager';

export class Game {
    private readonly engine: Engine;

    private readonly world: GameWorld;

    private readonly renderer: PixiRenderer;

    private input!: InputManager;

    public constructor() {
        this.renderer = new PixiRenderer();

        this.engine = new Engine(this.renderer);

        const world = new World();

        this.world = new GameWorld(world);
    }

    public async start(): Promise<void> {
        const container = document.getElementById('app');

        if (container === null) {
            throw new Error('Root element not found');
        }

        await this.engine.initialize(container);

        this.world.attachRenderer(this.renderer);

        this.input = new InputManager(
            this.renderer.getCanvas()
        );

        this.world.attachInput(this.input);

        this.engine.setWorldUpdate((time) => {
            this.world.update(time);
        });
    }

    public destroy(): void {
        this.input.destroy();

        this.engine.destroy();
    }
}