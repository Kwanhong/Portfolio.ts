import { Helper } from "./Helper"

export class Time {
    private lastTime: number = 0
    private currentTime: number = 0
    static self?: Time
    private static startTime: number = performance.now()
    static lastClickedTime: number = 0
    constructor() {
        this.currentTime = performance.now()
        Time.self = this
    }

    update() {
        this.lastTime = this.currentTime
        this.currentTime = performance.now()
    }

    get deltaTime() {
        return (this.currentTime - this.lastTime) / 1000
    }

    static getNoise(speed: number = 1) {
        let time = ((this.self?.currentTime ?? this.startTime) - this.startTime) * 0.001
        return Helper.noise(time * speed, 0)
    }

    private static terminationThreshold: number = 10
    private static terminationCount: number = 0

    static async coroutine(waitUntil: () => boolean, update: () => void = () => { }, complete: () => void = () => { }) {
        return new Promise<void>((resolve) => {
            if (this.terminationCount > this.terminationThreshold) {
                console.warn('Coroutine termination threshold exceeded. Cannot start new coroutine.')
                complete()
                resolve()
                return
            }
            this.terminationCount++
            const checkCondition = () => {
                if (waitUntil()) {
                    complete()
                    this.terminationCount--
                    resolve()
                } else {
                    if (this.terminationCount > this.terminationThreshold) {
                        console.warn('Coroutine termination threshold exceeded. Forcing termination.')
                        this.terminationCount--
                        complete()
                        resolve()
                    }
                    requestAnimationFrame(checkCondition)
                    update()
                }
            }
            checkCondition()
        })
    }

    static async coroutineSec(waitForSecond: number, update: (dt: number) => void = () => { }, complete: () => void = () => { }) {
        return new Promise<void>((resolve) => {
            if (this.terminationCount > this.terminationThreshold) {
                console.warn('Coroutine termination threshold exceeded. Cannot start new coroutine.')
                complete()
                resolve()
                return
            }
            this.terminationCount++
            const startTime = performance.now()
            const checkCondition = () => {
                if ((performance.now() - startTime) >= waitForSecond * 1000) {
                    complete()
                    this.terminationCount--
                    resolve()
                } else {
                    if (this.terminationCount > this.terminationThreshold) {
                        console.warn('Coroutine termination threshold exceeded. Forcing termination.')
                        this.terminationCount--
                        complete()
                        resolve()
                    }
                    requestAnimationFrame(checkCondition)
                    update(this.self?.deltaTime ?? 0)
                }
            }
            checkCondition()
        })
    }
}