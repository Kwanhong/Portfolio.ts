import * as THREE from 'three'

export interface Scene {
    enabled: boolean
    mother: THREE.Scene
    self: THREE.Object3D
    onFinished? : () => void
    onReturned? : () => void

    run() : void
    refresh() : void
    update(dt: number) : void
    finish() : void
    resize() : void

    onKeyDownEvent?(event: KeyboardEvent): void
    onPointerDown?(event: PointerEvent): void
    onPointerMove?(event: PointerEvent): void
    onPointerUp?(event: PointerEvent): void
}
