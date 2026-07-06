export interface Renderer {
    initialize(container: HTMLElement): Promise<void>;

    resize(width: number, height: number): void;

    destroy(): void;
}