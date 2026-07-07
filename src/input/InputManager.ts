import { MouseState } from '@/input/MouseState';

export class InputManager {
    public readonly mouse = new MouseState();

    public constructor(private readonly canvas: HTMLCanvasElement) {
        this.attach();
    }

    private attach(): void {
        window.addEventListener('mousemove', this.onMove);
        window.addEventListener('mousedown', this.onDown);
        window.addEventListener('mouseup', this.onUp);
        window.addEventListener('wheel', this.onWheel, { passive: true });
    }

    private onMove = (e: MouseEvent): void => {
        this.mouse.deltaX = e.movementX;
        this.mouse.deltaY = e.movementY;

        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    };

    private onDown = (): void => {
        this.mouse.isDown = true;
    };

    private onUp = (): void => {
        this.mouse.isDown = false;
    };

    private onWheel = (e: WheelEvent): void => {
        // zoom будет через camera system
    };

    public destroy(): void {
        window.removeEventListener('mousemove', this.onMove);
        window.removeEventListener('mousedown', this.onDown);
        window.removeEventListener('mouseup', this.onUp);
        window.removeEventListener('wheel', this.onWheel);
    }
}