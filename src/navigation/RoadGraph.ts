import { RoadNode } from './RoadNode';

export class RoadGraph {

    private readonly nodes =
        new Map<string, RoadNode>();


    public addNode(
        x: number,
        y: number
    ): RoadNode {

        const key = this.key(x, y);

        let node =
            this.nodes.get(key);

        if (node === undefined) {

            node =
                new RoadNode(x, y);

            this.nodes.set(
                key,
                node
            );

        }

        return node;
    }


    public getNode(
        x: number,
        y: number
    ): RoadNode | undefined {

        return this.nodes.get(
            this.key(x, y)
        );

    }


    public getNodes(): readonly RoadNode[] {

        return [
            ...this.nodes.values()
        ];

    }


    private key(
        x: number,
        y: number
    ): string {

        return `${x}:${y}`;

    }

}