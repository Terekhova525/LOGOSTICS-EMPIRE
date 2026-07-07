import { Time } from '@/engine/time/Time';

export class GameLoop {
    private readonly time: Time;

    private readonly updateCallback: (time: Time) => void;

    private frameId: number | null = null;

    private running = false;

    public constructor(
        time: Time,
        updateCallback: (time: Time) => void
    ) {
        this.time = time;
        this.updateCallback = updateCallback;
    }

    public start(): void {
        if (this.running) {
            return;
        }

        this.running = true;

        this.time.initialize();

        this.frameId = requestAnimationFrame(this.tick);
    }

    public stop(): void {
        if (!this.running) {
            return;
        }

        this.running = false;

        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }

    private readonly tick = (): void => {
        if (!this.running) {
            return;
        }

        this.time.update();

        this.updateCallback(this.time);

        this.frameId = requestAnimationFrame(this.tick);
    };
}