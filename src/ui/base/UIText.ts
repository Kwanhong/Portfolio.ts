import { TextMesh } from '@objects/TextMesh'
import { UIObject } from './UIObject'
import type { TextStyle } from '@styles/TextStyle'
import * as THREE from 'three'
import { Language } from '@data/Language'

export class UIText extends UIObject {
    textMesh: TextMesh
    textKey?: string;
    get worldBounds() {
        if (!this.bounds) return { min: { x: -50, y: -50 }, max: { x: 50, y: 50 } }
        return { min: { x: this.bounds.min.x - this.position.x, y: this.bounds.min.y - this.position.y }, max: { x: this.bounds.max.x - this.position.x, y: this.bounds.max.y - this.position.y } }
    }
    constructor(text: string, style: TextStyle, onRender: ((bounds: { min: { x: number, y: number }, max: { x: number, y: number } }, size: { width: number, height: number }) => void) = () => { }) {
        super()

        this.textMesh = new TextMesh(text, style, (bounds, size) => {
            this.bounds = bounds
            this.size = size
            onRender(bounds, size)
        })
        this.add(this.textMesh)
        this.textMesh.position.setX(-this.size.width / 2)
        // this.textMesh.position.setY(this.size.height / 2)
    }

    setSize(size: { width: number, height: number }) {
        this.size = size
        this.bounds = { min: { x: -size.width / 2, y: -size.height / 2 }, max: { x: size.width / 2, y: size.height / 2 } }
        this.textMesh.setSize(size)
        this.textMesh.position.setX(-this.size.width / 2)
        // this.textMesh.position.setY(this.size.height / 2)
    }

    setBounds(bounds: { min: { x: number, y: number }, max: { x: number, y: number } }) {
        this.bounds = bounds
        this.size = { width: bounds.max.x - bounds.min.x, height: -(bounds.max.y - bounds.min.y) }
        this.textMesh.setBounds(bounds)
        this.textMesh.position.setX(-this.size.width / 2)
        // this.textMesh.position.setY(this.size.height / 2)
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

    updateText(lang?: string): void {
        if (this.textKey && lang) {
            const text = Language.helper.get(this.textKey as any, '', lang as any)
            this.textMesh.textMesh.text = text
            this.textMesh.textMesh.sync()
        }
    }
}