import { OverlayScene } from "../scene/scenes/OverlayScene";

type pointerStatus = 'up' | 'down' | 'none';
export class EventManager {
    private static _self: EventManager;
    public static get self(): EventManager {
        if (!this._self) {
            this._self = new EventManager();
        }
        return this._self;
    }

    public pointerStatus: pointerStatus = 'none';
    public pointerPressed: boolean = false;

    private keyListeners: ((event: KeyboardEvent) => void)[] = [];
    private pointerDownListeners: ((event: PointerEvent) => void)[] = [];
    private pointerMoveListeners: ((event: PointerEvent) => void)[] = [];
    private pointerUpListeners: ((event: PointerEvent) => void)[] = [];

    private constructor() {
        window.addEventListener('keydown', (event) => this.notifyKeyDownListeners(event));
        window.addEventListener('pointerdown', (event) => this.notifyPointerDownListeners(event));
        window.addEventListener('pointermove', (event) => this.notifyPointerMoveListeners(event));
        window.addEventListener('pointerup', (event) => this.notifyPointerUpListeners(event));
        this.addPointerDownListener(() => {
            this.pointerStatus = 'down';
            this.pointerPressed = true;
        });
        this.addPointerUpListener(() => {
            this.pointerStatus = 'up';
            this.pointerPressed = false;
        });
    }

    public addKeyDownListener(listener: (event: KeyboardEvent) => void): void {
        this.keyListeners.push(listener);
    }

    public removeKeyDownListener(listener: (event: KeyboardEvent) => void): void {
        this.keyListeners = this.keyListeners.filter(l => l !== listener);
    }

    public addPointerDownListener(listener: (event: PointerEvent) => void): void {
        this.pointerDownListeners.push(listener);
    }

    public removePointerDownListener(listener: (event: PointerEvent) => void): void {
        this.pointerDownListeners = this.pointerDownListeners.filter(l => l !== listener);
    }

    public addPointerMoveListener(listener: (event: PointerEvent) => void): void {
        this.pointerMoveListeners.push(listener);
    }

    public removePointerMoveListener(listener: (event: PointerEvent) => void): void {
        this.pointerMoveListeners = this.pointerMoveListeners.filter(l => l !== listener);
    }

    public addPointerUpListener(listener: (event: PointerEvent) => void): void {
        this.pointerUpListeners.push(listener);
    }

    public removePointerUpListener(listener: (event: PointerEvent) => void): void {
        this.pointerUpListeners = this.pointerUpListeners.filter(l => l !== listener);
    }

    private notifyKeyDownListeners(event: KeyboardEvent): void {
        this.keyListeners.forEach(listener => listener(event));
    }

    private notifyPointerDownListeners(event: PointerEvent): void {
        this.pointerDownListeners.forEach(listener => listener(event));
    }

    private notifyPointerMoveListeners(event: PointerEvent): void {
        this.pointerMoveListeners.forEach(listener => listener(event));
    }

    private notifyPointerUpListeners(event: PointerEvent): void {
        this.pointerUpListeners.forEach(listener => listener(event));
    }
}