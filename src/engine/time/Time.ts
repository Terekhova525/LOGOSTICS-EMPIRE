import { Clock } from '@/engine/time/Clock';

export class Time {
    private readonly clock: Clock;

    private previousTime = 0;

    private currentTime = 0;

    private deltaTime = 0;

    private elapsedTime = 0;

    public constructor(clock: Clock) {
        this.clock = clock;
    }

    public initialize(): void {
        const now = this.clock.now();

        this.previousTime = now;
        this.currentTime = now;
        this.deltaTime = 0;
        this.elapsedTime = 0;
    }

    public update(): void {
        this.currentTime = this.clock.now();

        this.deltaTime = (this.currentTime - this.previousTime) / 1000;

        this.elapsedTime += this.deltaTime;

        this.previousTime = this.currentTime;
    }

    public getDeltaTime(): number {
        return this.deltaTime;
    }

    public getElapsedTime(): number {
        return this.elapsedTime;
    }

    public getCurrentTime(): number {
        return this.currentTime;
    }
}