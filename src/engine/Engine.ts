import type { Renderer } from '@/rendering/Renderer';

import { EventBus } from '@/engine/events/EventBus';
import { GameLoop } from '@/engine/loop/GameLoop';
import { Logger } from '@/engine/logging/Logger';
import { LogLevel } from '@/engine/logging/LogLevel';
import { ServiceContainer } from '@/engine/services/ServiceContainer';
import { Clock } from '@/engine/time/Clock';
import { Time } from '@/engine/time/Time';

type EngineEvents = Record<string, never>;

export class Engine {
    private readonly renderer: Renderer;

    private readonly time: Time;

    private readonly gameLoop: GameLoop;

    private readonly eventBus: EventBus<EngineEvents>;

    private readonly services: ServiceContainer;

    private readonly logger: Logger;

    private worldUpdate: ((time: Time) => void) | null = null;

    public constructor(renderer: Renderer) {
        this.renderer = renderer;

        this.time = new Time(new Clock());

        this.eventBus = new EventBus<EngineEvents>();

        this.services = new ServiceContainer();

        this.logger = new Logger(LogLevel.Info);

        this.gameLoop = new GameLoop(this.time, this.update);

        this.services.register(Symbol.for('Engine.Time'), this.time);
        this.services.register(Symbol.for('Engine.EventBus'), this.eventBus);
        this.services.register(Symbol.for('Engine.Logger'), this.logger);
    }

    public setWorldUpdate(fn: (time: Time) => void): void {
        this.worldUpdate = fn;
    }

    public async initialize(container: HTMLElement): Promise<void> {
        await this.renderer.initialize(container);

        this.logger.info('Engine initialized');

        this.gameLoop.start();
    }

    public resize(width: number, height: number): void {
        this.renderer.resize(width, height);
    }

    public destroy(): void {
        this.gameLoop.stop();

        this.eventBus.clear();

        this.services.clear();

        this.renderer.destroy();

        this.logger.info('Engine destroyed');
    }

    private readonly update = (time: Time): void => {
        if (this.worldUpdate !== null) {
            this.worldUpdate(time);
        }
    };
}