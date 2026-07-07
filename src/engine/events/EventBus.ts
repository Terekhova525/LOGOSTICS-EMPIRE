import type { EventHandler } from '@/engine/events/EventHandler';
import type { EventMap } from '@/engine/events/EventMap';

export class EventBus<TEvents extends EventMap> {
    private readonly handlers = new Map<
        keyof TEvents,
        Set<EventHandler<TEvents[keyof TEvents]>>
    >();

    public subscribe<TKey extends keyof TEvents>(
        eventType: TKey,
        handler: EventHandler<TEvents[TKey]>
    ): () => void {
        let listeners = this.handlers.get(eventType);

        if (listeners === undefined) {
            listeners = new Set<EventHandler<TEvents[keyof TEvents]>>();

            this.handlers.set(eventType, listeners);
        }

        listeners.add(handler as EventHandler<TEvents[keyof TEvents]>);

        return (): void => {
            listeners?.delete(handler as EventHandler<TEvents[keyof TEvents]>);

            if (listeners?.size === 0) {
                this.handlers.delete(eventType);
            }
        };
    }

    public publish<TKey extends keyof TEvents>(
        eventType: TKey,
        event: Readonly<TEvents[TKey]>
    ): void {
        const listeners = this.handlers.get(eventType);

        if (listeners === undefined) {
            return;
        }

        for (const listener of listeners) {
            (
                listener as EventHandler<TEvents[TKey]>
            )(event);
        }
    }

    public clear(): void {
        this.handlers.clear();
    }
}