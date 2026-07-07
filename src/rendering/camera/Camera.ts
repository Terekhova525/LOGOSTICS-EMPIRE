export class Camera {
    public x = 0;
    public y = 0;
    public zoom = 1;

    public worldToScreen(x: number, y: number): { x: number; y: number } {
        return {
            x: (x - this.x) * this.zoom,
            y: (y - this.y) * this.zoom
        };
    }
}