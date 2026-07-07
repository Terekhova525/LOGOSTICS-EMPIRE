import { LogLevel } from '@/engine/logging/LogLevel';

export class Logger {
    private readonly minimumLevel: LogLevel;

    public constructor(minimumLevel: LogLevel = LogLevel.Info) {
        this.minimumLevel = minimumLevel;
    }

    public debug(message: string, ...args: readonly unknown[]): void {
        if (this.minimumLevel > LogLevel.Debug) {
            return;
        }

        console.debug(message, ...args);
    }

    public info(message: string, ...args: readonly unknown[]): void {
        if (this.minimumLevel > LogLevel.Info) {
            return;
        }

        console.info(message, ...args);
    }

    public warn(message: string, ...args: readonly unknown[]): void {
        if (this.minimumLevel > LogLevel.Warn) {
            return;
        }

        console.warn(message, ...args);
    }

    public error(message: string, ...args: readonly unknown[]): void {
        if (this.minimumLevel > LogLevel.Error) {
            return;
        }

        console.error(message, ...args);
    }
}