import * as THREE from 'three'

export interface Scene {
    enabled: boolean
    mother: THREE.Scene
    self: THREE.Object3D
    onFinished? : () => void

    run() : void
    refresh() : void
    update(dt: number) : void
    finish() : void
}