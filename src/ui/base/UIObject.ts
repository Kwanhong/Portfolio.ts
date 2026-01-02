import { SceneObject } from '@objects/SceneObject'
import * as THREE from 'three'

export class UIObject extends SceneObject {
    isHovered: boolean = false
    update(dt: number) {
        super.update(dt)
    }
    onHover() { }
    onBlur() { }
    onPress() { }
    constructor() {
        super()
    }

    add(object: THREE.Object3D): this {
        super.add(object)
        return this
    }

    roundedPlaneGeometry(width: number, height: number, radius: number) {
        const shape = new THREE.Shape();

        const x = -width / 2;
        const y = -height / 2;
        shape.moveTo(x, y + radius);
        shape.lineTo(x, y + height - radius);
        shape.absarc(x + radius, y + height - radius, radius, Math.PI, Math.PI / 2, true);
        shape.lineTo(x + width - radius, y + height);
        shape.absarc(x + width - radius, y + height - radius, radius, Math.PI / 2, 0, true);
        shape.lineTo(x + width, y + radius);
        shape.absarc(x + width - radius, y + radius, radius, 0, -Math.PI / 2, true);
        shape.lineTo(x + radius, y);
        shape.absarc(x + radius, y + radius, radius, -Math.PI / 2, -Math.PI, true);

        return new THREE.ShapeGeometry(shape);
    }
}