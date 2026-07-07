export class MouseState {
    public x = 0;
    public y = 0;

    public worldX = 0;
    public worldY = 0;

    public isDown = false;

    public deltaX = 0;
    public deltaY = 0;

    public resetDelta(): void {
        this.deltaX = 0;
        this.deltaY = 0;
    }
}