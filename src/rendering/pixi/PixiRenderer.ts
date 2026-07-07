import * as PIXI from 'pixi.js';

import { TileType } from '@/map/TileType';
import { TileView } from '@/rendering/map/TileView';

export class PixiRenderer {
    private app!: PIXI.Application;

    private readonly worldLayer = new PIXI.Container();

    private readonly mapLayer = new PIXI.Container();

    private readonly entityLayer = new PIXI.Container();

    private readonly sprites = new Map<number, PIXI.Graphics>();

    private readonly tiles = new Map<string, TileView>();

    public async initialize(container: HTMLElement): Promise<void> {
        this.app = new PIXI.Application();

        await this.app.init({
            width: container.clientWidth || 800,
            height: container.clientHeight || 600,
            background: 0x111111,
            antialias: true
        });

        this.worldLayer.addChild(this.mapLayer);
        this.worldLayer.addChild(this.entityLayer);

        this.app.stage.addChild(this.worldLayer);

        container.appendChild(this.app.canvas);
    }

    public getCanvas(): HTMLCanvasElement {
        return this.app.canvas;
    }

    public updateTile(
        x: number,
        y: number,
        tileType: number
    ): void {
        const key = `${x}:${y}`;

        if (this.tiles.has(key)) {
            return;
        }

        const tile = new TileView(
            x,
            y,
            tileType as TileType
        );

        this.tiles.set(key, tile);

        this.mapLayer.addChild(tile.graphics);
    }

    public updateEntity(
        id: number,
        x: number,
        y: number,
        _spriteId: string
    ): void {
        let sprite = this.sprites.get(id);

        if (sprite === undefined) {
            sprite = new PIXI.Graphics();

            sprite
                .circle(0, 0, 12)
                .fill(0x00ffcc);

            this.entityLayer.addChild(sprite);

            this.sprites.set(id, sprite);
        }

        sprite.position.set(x, y);
    }

    public resize(
        width: number,
        height: number
    ): void {
        this.app.renderer.resize(width, height);
    }

    public destroy(): void {
        this.tiles.clear();

        this.sprites.clear();

        this.app.destroy(true);
    }
}