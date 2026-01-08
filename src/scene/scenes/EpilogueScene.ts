import * as THREE from 'three'
import type { Scene } from './Scene'

export class EpilogueScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined
    
    private _enabled: boolean = false;
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    constructor(scene: THREE.Scene, onFinished: ()=>void = ()=>{}) {
        this.mother = scene
        this.mother.add(this.self)
        this.onFinished = onFinished
        this.enabled = false
    }
    
    run() {
        this.enabled = true
    }

    refresh(): void {
    }

    update(_: number): void {
    }

    resize(): void {
        
    }

    finish(): void {
        this.enabled = false
        this.onFinished?.()
    }
}   