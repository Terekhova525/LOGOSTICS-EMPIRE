import { Camera } from '@/rendering/camera/Camera';

export class CameraController {
    public constructor(private readonly camera: Camera) {}

    public sync(x: number, y: number, zoom: number): void {
        this.camera.x = x;
        this.camera.y = y;
        this.camera.zoom = zoom;
    }
}