import * as PIXI from 'pixi.js';

import { TilePalette } from '@/rendering/map/TilePalette';

import { TileType } from '@/map/TileType';

export class TileView {
    public static readonly SIZE = 32;

    public readonly graphics: PIXI.Graphics;

    public constructor(
        x: number,
        y: number,
        type: TileType
    ) {
        this.graphics = new PIXI.Graphics();

        this.graphics
            .rect(
                0,
                0,
                TileView.SIZE,
                TileView.SIZE
            )
            .fill(
                TilePalette.getColor(type)
            );

        this.graphics.position.set(
            x * TileView.SIZE,
            y * TileView.SIZE
        );
    }
}