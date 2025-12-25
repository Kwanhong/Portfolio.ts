import { TextMesh } from '@objects/TextMesh'
import { UIObject } from './UIObject'
import type { TextStyle } from '@styles/TextStyle'

export class UIText extends UIObject {
    textMesh: TextMesh

    constructor(text: string, style: TextStyle, onRender: ((bounds: { min: { x: number, y: number }, max: { x: number, y: number } }, size: { width: number, height: number }) => void) = ()=>{}) {
        super()

        this.textMesh = new TextMesh(text, style, onRender)
        super.add(this.textMesh)
    }

    update(dt: number): void {
        this.textMesh.update(dt)
        // You can add any animations or updates to the UI text here
    }
}