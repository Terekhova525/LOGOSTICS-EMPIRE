import { Application } from '@/application/Application';

let application: Application | null = null;

async function start(): Promise<void> {
    application = new Application();

    await application.start();
}

function shutdown(): void {
    if (application === null) {
        return;
    }

    application.destroy();
    application = null;
}

export async function bootstrap(): Promise<void> {
    window.addEventListener('beforeunload', shutdown);

    await start();
}