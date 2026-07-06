import type { Renderer } from '@/rendering/Renderer';

export class Engine {
    private readonly renderer: Renderer;

    public constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    public async initialize(container: HTMLElement): Promise<void> {
        await this.renderer.initialize(container);
    }

    public resize(width: number, height: number): void {
        this.renderer.resize(width, height);
    }

    public destroy(): void {
        this.renderer.destroy();
    }
}