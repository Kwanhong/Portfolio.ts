import { SceneObject } from '@objects/SceneObject'
import * as THREE from 'three'

export class UIObject extends SceneObject {
    isHovered: boolean = false
    update(dt: number) {
        super.update(dt)
    }
    onHover() {}
    onBlur() {}
    onPress() {}
    constructor() {
        super()
    }

    add(object: THREE.Object3D): this {
        super.add(object)
        return this
    }
}