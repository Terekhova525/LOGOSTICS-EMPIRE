import { CameraTransform } from '@/rendering/camera/CameraTransform';

export class CameraView {
    public constructor(
        private readonly transform: CameraTransform
    ) {}

    public apply(
        container: {
            position: {
                set(x: number, y: number): void;
            };
            scale: {
                set(value: number): void;
            };
        }
    ): void {
        container.position.set(
            -this.transform.x,
            -this.transform.y
        );

        container.scale.set(
            this.transform.zoom
        );
    }
}