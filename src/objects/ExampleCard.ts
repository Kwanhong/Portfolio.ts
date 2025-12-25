import * as THREE from 'three'
import { UIObject } from '@ui/base/UIObject'

export class ExampleCard extends UIObject {
    mesh: THREE.Mesh

    constructor() {
        super()
        
        const geometry = new THREE.BoxGeometry(100, 100, 0.1)
        const material = new THREE.MeshBasicMaterial({ color: 0xeae7e2 })
        this.mesh = new THREE.Mesh(geometry, material)

        console.log(this.mesh.position)
        this.add(this.mesh)
    }

    update(dt: number): void {
        this.mesh.rotation.y += dt
    }
}