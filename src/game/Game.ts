import { Engine } from '@/engine/Engine';
import { PixiRenderer } from '@/rendering/pixi/PixiRenderer';

export class Game {
    private readonly engine: Engine;

    public constructor() {
        const renderer = new PixiRenderer();

        this.engine = new Engine(renderer);
    }

    public async start(): Promise<void> {
        const container = document.getElementById('app');

        if (container === null) {
            throw new Error('Root element "#app" was not found.');
        }

        await this.engine.initialize(container);
    }

    public destroy(): void {
        this.engine.destroy();
    }
}