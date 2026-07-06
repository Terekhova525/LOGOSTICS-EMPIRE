import { Game } from '@/game/Game';

export class Application {
    private readonly game: Game;

    public constructor() {
        this.game = new Game();
    }

    public async start(): Promise<void> {
        await this.game.start();
    }

    public destroy(): void {
        this.game.destroy();
    }
}