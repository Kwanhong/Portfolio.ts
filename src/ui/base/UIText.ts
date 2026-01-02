import { TextMesh } from '@objects/TextMesh'
import { UIObject } from './UIObject'
import type { TextStyle } from '@styles/TextStyle'
import * as THREE from 'three'

export class UIText extends UIObject {
    textMesh: TextMesh
    bounds?: { min: { x: number, y: number }, max: { x: number, y: number } }
    size?: { width: number, height: number }
    get worldBounds() {
        if (!this.bounds) return {min: {x: -50, y: -50}, max: {x: 50, y: 50}}
        return {min: {x: this.bounds.min.x - this.position.x, y: this.bounds.min.y - this.position.y}, max: {x: this.bounds.max.x - this.position.x, y: this.bounds.max.y - this.position.y}}
    }
    constructor(text: string, style: TextStyle, onRender: ((bounds: { min: { x: number, y: number }, max: { x: number, y: number } }, size: { width: number, height: number }) => void) = ()=>{}) {
        super()

        this.textMesh = new TextMesh(text, style, (bounds, size)=>{
            this.bounds = bounds
            this.size = size
            onRender(bounds, size)
        })
        super.add(this.textMesh)
    }

    setSize(size: { width: number, height: number }) {
        this.size = size
        this.textMesh.setSize(size)
    }

    setBounds(bounds: { min: { x: number, y: number }, max: { x: number, y: number } }) {
        this.bounds = bounds
        // this.textMesh.setBounds(bounds)
    }

    update(dt: number): void {
        this.textMesh.update(dt)
        // You can add any animations or updates to the UI text here
    }

    setOpacity(opacity: number): void {
        (this.textMesh.textMesh.material as THREE.MeshBasicMaterial).opacity = opacity
        this.textMesh.textMesh.sync()
    }

    setText(text: string): void {
        this.textMesh.textMesh.text = text
        this.textMesh.textMesh.sync()
    }   
}