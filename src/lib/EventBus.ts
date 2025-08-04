export class EventBus {
    private static instance: EventBus;

    private constructor() {
        // Singleton to avoid multiple instances
    }

    public static getInstance(): EventBus {
        if (!EventBus.instance) {
            if ((window as any).globalEventBus) {
                EventBus.instance = (window as any).globalEventBus;
            } else {
                EventBus.instance = new EventBus();
                (window as any).globalEventBus = EventBus.instance;
            }
        }
        return EventBus.instance;
    }

    // Emitir un evento con un nombre personalizado y carga opcional
    public emit(eventName: string, detail: any = {}): void {
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    }

    // Suscribirse a un evento
    public on(eventName: string, callback: (event: CustomEvent) => void): () => void {
        const handler = (event: Event) => {
            callback(event as CustomEvent);
        };

        // Añadir el manejador de eventos
        window.addEventListener(eventName, handler as EventListener);

        // Retornar función para desuscribirse
        return () => {
            window.removeEventListener(eventName, handler as EventListener);
        };
    }

    // Eliminar la suscripción de un evento
    public off(eventName: string, callback: (event: CustomEvent) => void): void {
        window.removeEventListener(eventName, callback as EventListener);
    }
}
