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
        // Code to refresh or update the scene
    }

    update(_: number): void {
        // Update logic for EpilogueScene if needed
    }

    resize(): void {
        
    }

    finish(): void {
        // Code to execute when the scene is finished
        this.enabled = false
        this.onFinished?.()
    }
}   