export class ServiceContainer {
    private readonly services = new Map<symbol, unknown>();

    public register<T>(token: symbol, service: T): void {
        if (this.services.has(token)) {
            throw new Error(`Service "${String(token)}" is already registered.`);
        }

        this.services.set(token, service);
    }

    public resolve<T>(token: symbol): T {
        const service = this.services.get(token);

        if (service === undefined) {
            throw new Error(`Service "${String(token)}" is not registered.`);
        }

        return service as T;
    }

    public has(token: symbol): boolean {
        return this.services.has(token);
    }

    public clear(): void {
        this.services.clear();
    }
}