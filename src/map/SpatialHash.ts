export class SpatialHash<T> {
    private readonly cells = new Map<string, Set<T>>();

    public constructor(
        private readonly cellSize: number
    ) {}

    private key(
        x: number,
        y: number
    ): string {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);

        return `${cellX}:${cellY}`;
    }

    public insert(
        x: number,
        y: number,
        value: T
    ): void {
        const key = this.key(x, y);

        let bucket = this.cells.get(key);

        if (bucket === undefined) {
            bucket = new Set<T>();
            this.cells.set(key, bucket);
        }

        bucket.add(value);
    }

    public query(
        x: number,
        y: number
    ): readonly T[] {
        const bucket = this.cells.get(this.key(x, y));

        if (bucket === undefined) {
            return [];
        }

        return [...bucket];
    }

    public clear(): void {
        this.cells.clear();
    }
}