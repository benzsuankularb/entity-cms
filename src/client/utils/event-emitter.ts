export type EventListener<T> = (val: T) => void | Promise<void>;

export class EventEmitter<T> {
    private readonly _listeners: EventListener<T>[];

    constructor() {
        this._listeners = [];
    }

    invoke(val: T) {
        this._listeners.forEach(listener => {
            try {
                listener(val)
            } catch(e) {
                console.error(e);
            }
        })
    }

    addListener(listener: EventListener<T>) {
        if (this._listeners.indexOf(listener) !== -1) {
            return;
        }

        this._listeners.push(listener);
    }

    removeListener(listener: EventListener<T>) {
        const index = this._listeners.indexOf(listener);
        if (index === -1) {
            return;
        }

        this._listeners.splice(index, 1);
    }
}