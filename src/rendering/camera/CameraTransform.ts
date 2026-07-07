export class CameraTransform {
    public x = 0;
    public y = 0;
    public zoom = 1;

    public move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    public setZoom(value: number): void {
        this.zoom = Math.max(0.2, Math.min(value, 3));
    }
}