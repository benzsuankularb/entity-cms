export type EventListener = () => void | Promise<void>;

export class EventEmitter {
    private readonly _listeners: EventListener[];

    constructor() {
        this._listeners = [];
    }

    invoke() {
        this._listeners.forEach(listener => {
            try {
                listener()
            } catch(e) {
                console.error(e);
            }
        })
    }

    addListener(listener: EventListener) {
        if (this._listeners.indexOf(listener) !== -1) {
            return;
        }

        this._listeners.push(listener);
    }

    removeListener(listener: EventListener) {
        const index = this._listeners.indexOf(listener);
        if (index === -1) {
            return;
        }

        this._listeners.splice(index, 1);
    }
}