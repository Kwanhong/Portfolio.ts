import { SceneObject } from './SceneObject'
import { Text } from 'troika-three-text'
import type { TextStyle } from '@styles/TextStyle'
import * as THREE from 'three'

export class TextMesh extends SceneObject {
    textMesh: Text

    constructor(text: string, style: TextStyle, onRender: ((bounds: { min: { x: number, y: number }, max: { x: number, y: number } }, size: { width: number, height: number }) => void) = ()=>{}) {
        super()

        this.textMesh = new Text()
        this.textMesh.material = new THREE.MeshBasicMaterial({ transparent: true })
        this.textMesh.material.opacity = 0.6
        this.textMesh.text = text
        this.textMesh.fontSize = style.fontSize
        this.textMesh.color = new THREE.Color(style.color);
        (this.textMesh as any).textAlign = style.textAlign === 'right' ? 'right' : style.textAlign === 'left' ? 'left' : 'center';
        console.log('clipRect:', (this.textMesh as any).clipRect);
        this.textMesh.anchorX = style.anchorX ?? 'left'
        this.textMesh.anchorY = style.anchorY ?? 'middle'
        this.textMesh.font = style.font
        this.textMesh.lineHeight = style.lineHeight
        this.textMesh.letterSpacing = style.letterSpacing

        super.add(this.textMesh)
        this.textMesh.sync()
        this.textMesh.geometry.computeBoundingBox();

        const listener = () => {
            const bounds = this.textMesh.geometry.boundingBox;
            if (!bounds) return;
            const width = bounds.max.x - bounds.min.x;
            const height = bounds.max.y - bounds.min.y;
            console.log(`TextMesh synccomplete: width=${width}, height=${height}`);
            onRender({ min: bounds.min, max: bounds.max }, { width, height });
            this.textMesh.removeEventListener("synccomplete" as any, listener);
        }

        this.textMesh.addEventListener("synccomplete" as any, listener);
    }

    setSize(size: { width: number, height: number }) {
        this.textMesh.maxWidth = size.width
        this.textMesh.sync()
    }

    setBounds(bounds: { min: { x: number, y: number }, max: { x: number, y: number } }) {
        this.textMesh.maxWidth = bounds.max.x - bounds.min.x
        // this.textMesh.position.set(-bounds.min.x, -bounds.min.y, 0)
        this.textMesh.geometry.computeBoundingBox();
        this.textMesh.sync()
    }

    update(_: number): void {
        this.textMesh.updateMatrixWorld()
    }
}