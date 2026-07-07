export class RoadNode {

    private static nextId = 1;

    public readonly id: number;

    public readonly neighbours: RoadNode[] = [];

    public constructor(
        public readonly x: number,
        public readonly y: number
    ) {

        this.id =
            RoadNode.nextId++;

    }

    public addNeighbour(
        node: RoadNode
    ): void {

        if (
            this.neighbours.includes(node)
        ) {
            return;
        }

        this.neighbours.push(
            node
        );

    }

}