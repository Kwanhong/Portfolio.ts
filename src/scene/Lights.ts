import { Color } from '@data/Color'
import * as THREE from 'three'

export class Lights {
    static addToScene(scene: THREE.Scene) {
        const ambientLight = new THREE.AmbientLight(Color.helper.getHex('light.ambient'), 0.3)
        scene.add(ambientLight)

        const warmLight = new THREE.DirectionalLight(Color.helper.getHex('light.primary'), 1.8)
        warmLight.position.set(400, 400, 300)
        warmLight.target.position.set(0, 0, 0)
        scene.add(warmLight)

        const coldLight = new THREE.DirectionalLight(Color.helper.getHex('light.secondary'), 3)
        coldLight.position.set(-400, -400, 300)
        coldLight.target.position.set(0, 0, 0)
        scene.add(coldLight)

    }
}