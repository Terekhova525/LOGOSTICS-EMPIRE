import { ChunkId } from '@/map/ChunkId';

export class Chunk {
    public readonly id: ChunkId;

    public readonly tiles: number[] = [];

    public constructor(
        x: number,
        y: number
    ) {
        this.id = new ChunkId(x, y);
    }
}