import * as THREE from 'three'

export class SceneObject extends THREE.Object3D {
    isHovered: boolean = false

    get visibleGlobally(): boolean {
        if (
            this.visible == false || 
            this.parent?.visible === false || 
            this.parent?.parent?.visible === false || 
            this.parent?.parent?.parent?.visible === false || 
            this.parent?.parent?.parent?.parent?.visible === false || 
            this.parent?.parent?.parent?.parent?.parent?.visible === false || 
            this.parent?.parent?.parent?.parent?.parent?.parent?.visible === false
        ) { 
            return false 
        } else {
            return true
        }
    }

    update(dt: number) {}

    onHover() {}
    onBlur() {}
    onPress() {}

    constructor() {
        super()
    }
}   