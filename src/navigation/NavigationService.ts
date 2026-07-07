import { RoadGraph } from './RoadGraph';
import { RoadNode } from './RoadNode';

export class NavigationService {

    public constructor(
        private readonly graph: RoadGraph
    ) {}

    public getGraph(): RoadGraph {

        return this.graph;

    }

    public findNearestNode(
        x: number,
        y: number
    ): RoadNode | null {

        let best: RoadNode | null = null;

        let bestDistance =
            Number.MAX_VALUE;

        for (const node of this.graph.getNodes()) {

            const dx =
                node.x - x;

            const dy =
                node.y - y;

            const distance =
                dx * dx +
                dy * dy;

            if (distance >= bestDistance) {
                continue;
            }

            bestDistance =
                distance;

            best =
                node;
        }

        return best;
    }

    public getRandomRoadNode(): RoadNode {

        const nodes =
            this.graph.getNodes();

        if (nodes.length === 0) {
            throw new Error(
                'Road graph is empty.'
            );
        }

        const index =
            Math.floor(
                Math.random() *
                nodes.length
            );

        const node =
            nodes[index];

        if (node === undefined) {
            throw new Error(
                'Failed to select a road node.'
            );
        }

        return node;
    }

}