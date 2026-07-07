export class Clock {
    public now(): number {
        return performance.now();
    }
}