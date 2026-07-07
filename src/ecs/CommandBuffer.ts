export class CommandBuffer {
    private readonly commands: Array<() => void> = [];

    public enqueue(command: () => void): void {
        this.commands.push(command);
    }

    public flush(): void {
        for (const command of this.commands) {
            command();
        }

        this.commands.length = 0;
    }

    public clear(): void {
        this.commands.length = 0;
    }
}