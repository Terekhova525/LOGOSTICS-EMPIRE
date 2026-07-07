import { TileType } from '@/map/TileType';

export class Tile {
    public constructor(
        public readonly x: number,
        public readonly y: number,
        public type: TileType
    ) {}
}