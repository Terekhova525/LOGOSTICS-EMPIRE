import { TileType } from '@/map/TileType';

export class TilePalette {
    public static getColor(
        type: TileType
    ): number {
        switch (type) {
            case TileType.Road:
                return 0x4f4f4f;

            case TileType.Building:
                return 0x7d7d7d;

            case TileType.Park:
                return 0x3ea84f;

            default:
                return 0x1a1a1a;
        }
    }
}