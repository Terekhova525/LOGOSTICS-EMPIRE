import { TileType } from '@/map/TileType';

export interface GridTile {
    readonly x: number;
    readonly y: number;
    readonly type: TileType;
}

export class WorldGrid {
    private readonly tiles: TileType[];

    public constructor(
        public readonly width: number,
        public readonly height: number
    ) {
        this.tiles = new Array<TileType>(width * height);

        this.fill(TileType.Empty);
    }

    public fill(type: TileType): void {
        this.tiles.fill(type);
    }

    public contains(
        x: number,
        y: number
    ): boolean {
        return (
            x >= 0 &&
            y >= 0 &&
            x < this.width &&
            y < this.height
        );
    }

    public get(
        x: number,
        y: number
    ): TileType {
        if (!this.contains(x, y)) {
            throw new RangeError(
                `Tile (${x}, ${y}) is outside world bounds.`
            );
        }

        return this.tiles[y * this.width + x]!;
    }

    public set(
        x: number,
        y: number,
        type: TileType
    ): void {
        if (!this.contains(x, y)) {
            return;
        }

        this.tiles[y * this.width + x] = type;
    }

    public *getTiles(): Iterable<GridTile> {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                yield {
                    x,
                    y,
                    type: this.tiles[y * this.width + x]!
                };
            }
        }
    }

    public forEach(
        callback: (
            x: number,
            y: number,
            type: TileType
        ) => void
    ): void {
        for (const tile of this.getTiles()) {
            callback(
                tile.x,
                tile.y,
                tile.type
            );
        }
    }
}