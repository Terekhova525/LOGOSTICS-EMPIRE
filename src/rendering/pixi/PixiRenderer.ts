import { Application as PixiApplication } from 'pixi.js';

import { AppConfig } from '@/shared/config/AppConfig';
import { Renderer } from '@/rendering/Renderer';

export class PixiRenderer implements Renderer {
    private readonly application: PixiApplication;

    public constructor() {
        this.application = new PixiApplication();
    }

    public async initialize(container: HTMLElement): Promise<void> {
        await this.application.init({
            resizeTo: window,
            background: AppConfig.rendering.backgroundColor,
            antialias: AppConfig.rendering.antialias,
            autoDensity: AppConfig.rendering.autoDensity
        });

        container.replaceChildren(this.application.canvas);
    }

    public resize(_width: number, _height: number): void {
        // resizeTo: window выполняет изменение размеров автоматически.
    }

    public destroy(): void {
        this.application.destroy(
            true,
            {
                children: true,
                texture: true,
                textureSource: true
            }
        );
    }
}