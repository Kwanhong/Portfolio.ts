import * as THREE from 'three'
import type { Scene } from './Scene'
import { UIOpaqueBlurButton } from '@ui/base/UIButton'
import { Camera } from '../Camera'

export class ContentsScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined
    onReturned?: (() => void) | undefined
    
    private _enabled: boolean = false;
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    private returnButton: UIOpaqueBlurButton
    private finishButton: UIOpaqueBlurButton

    constructor(scene: THREE.Scene, onReturned: ()=>void = ()=>{}, onFinished: ()=>void = ()=>{}) {
        this.mother = scene
        this.mother.add(this.self)
        this.onFinished = onFinished
        this.onReturned = onReturned
        this.enabled = false

        const returnButton = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: 'Return',
            onClick: () => {
                this.return()
            }
        })
        
        this.self.add(returnButton)
        
        const finishButton = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: 'Finish',
            onClick: () => {
                this.finish()
            }
        })
        
        this.self.add(finishButton)

        this.returnButton = returnButton
        this.finishButton = finishButton
    }

    run() {
        this.enabled = true
        this.resize()
        console.log('ContentsScene run')
    }

    refresh(): void {
        // Code to refresh or update the scene
    }

    update(_: number): void {
        // Update logic for ContentsScene if needed
    }

    resize(): void {
        const margin = 10
        this.finishButton.position.set(Camera.size.width / 2 - this.finishButton.size.width / 2 - margin, -Camera.size.height / 2 + this.finishButton.size.height / 2 + margin, 0)
        this.returnButton.position.set(-Camera.size.width / 2 + this.returnButton.size.width / 2 + margin, -Camera.size.height / 2 + this.returnButton.size.height / 2 + margin, 0)
    }

    return(): void {
        this.enabled = false
        this.onReturned?.()
    }   
    
    finish(): void {
        this.enabled = false
        this.onFinished?.()
    }
}