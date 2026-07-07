import {
    TILE_SIZE,
    HALF_TILE
} from '@/map/MapConstants';

export class CoordinateConverter {

    public static worldToTileX(
        x: number
    ): number {

        return Math.floor(
            x / TILE_SIZE
        );

    }

    public static worldToTileY(
        y: number
    ): number {

        return Math.floor(
            y / TILE_SIZE
        );

    }

    public static tileToWorldX(
        x: number
    ): number {

        return x * TILE_SIZE;

    }

    public static tileToWorldY(
        y: number
    ): number {

        return y * TILE_SIZE;

    }

    public static tileCenterX(
        x: number
    ): number {

        return x * TILE_SIZE + HALF_TILE;

    }

    public static tileCenterY(
        y: number
    ): number {

        return y * TILE_SIZE + HALF_TILE;

    }

}