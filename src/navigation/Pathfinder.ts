import { RoadGraph } from './RoadGraph';
import { RoadNode } from './RoadNode';

export class Pathfinder {

    public constructor(
        private readonly graph: RoadGraph
    ) {}

    public find(
        start: RoadNode,
        goal: RoadNode
    ): RoadNode[] {

        const queue: RoadNode[] = [start];

        const visited = new Set<RoadNode>();

        const parent = new Map<RoadNode, RoadNode>();

        visited.add(start);

        while (queue.length > 0) {

            const current = queue.shift();

            if (current === undefined) {
                break;
            }

            if (current === goal) {
                return this.buildPath(
                    parent,
                    goal
                );
            }

            for (const neighbour of current.neighbours) {

                if (visited.has(neighbour)) {
                    continue;
                }

                visited.add(neighbour);

                parent.set(
                    neighbour,
                    current
                );

                queue.push(
                    neighbour
                );
            }
        }

        return [];
    }

    private buildPath(
        parent: Map<RoadNode, RoadNode>,
        goal: RoadNode
    ): RoadNode[] {

        const result: RoadNode[] = [];

        let current: RoadNode | undefined = goal;

        while (current !== undefined) {

            result.push(current);

            current = parent.get(current);

        }

        result.reverse();

        return result;
    }

}