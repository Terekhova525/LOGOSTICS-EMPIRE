import { WorldGrid } from '@/map/WorldGrid';
import { TileType } from '@/map/TileType';

import { RoadGraph } from './RoadGraph';

const DIRS: ReadonlyArray<readonly [number, number]> = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];

export class RoadGraphBuilder {

    public build(
        grid: WorldGrid
    ): RoadGraph {

        const graph =
            new RoadGraph();

        for (const tile of grid.getTiles()) {

            if (tile.type !== TileType.Road) {
                continue;
            }

            graph.addNode(
                tile.x,
                tile.y
            );

        }

        for (const tile of grid.getTiles()) {

            if (tile.type !== TileType.Road) {
                continue;
            }

            const node =
                graph.getNode(
                    tile.x,
                    tile.y
                );

            if (node === undefined) {
                continue;
            }

            for (const [dx, dy] of DIRS) {

                const neighbour =
                    graph.getNode(
                        tile.x + dx,
                        tile.y + dy
                    );

                if (neighbour !== undefined) {
                    node.addNeighbour(
                        neighbour
                    );
                }

            }

        }

        return graph;
    }

}