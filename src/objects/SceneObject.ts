import * as THREE from 'three'

export class SceneObject extends THREE.Object3D {
    isHovered: boolean = false

    update(dt: number) {
        console.log(dt)
    }

    onHover() {}
    onBlur() {}
    onPress() {}

    constructor() {
        super()
    }
}   