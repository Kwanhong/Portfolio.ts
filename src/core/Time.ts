export class Time {
    private lastTime: number = 0
    private currentTime: number = 0

    constructor() {
        this.currentTime = performance.now()
    }

    update() {
        this.lastTime = this.currentTime
        this.currentTime = performance.now()
    }

    get deltaTime() {
        return (this.currentTime - this.lastTime) / 1000
    }
}