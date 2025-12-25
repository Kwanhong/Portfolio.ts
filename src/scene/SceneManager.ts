import * as THREE from 'three'
import { Camera } from './Camera'
import { Lights } from './Lights'
import { Language } from '@data/Language'
import { Color } from '@data/Color'

import type { Scene } from './scenes/Scene'
import { MainScene } from './scenes/MainScene'
import { ContentsScene } from './scenes/ContentsScene'
import { EpilogueScene } from './scenes/EpilogueScene'

export class SceneManager {
    mother = new THREE.Scene()
    camera = new Camera()
    scenes: Array<Scene> = []

    constructor() {
        this.mother.background = Color.helper.get('background.primary')
        this.mother.add(this.camera.instance)
        Lights.addToScene(this.mother)
        Language.helper.set('en')

        this.scenes.push(new MainScene(this.mother, () => this.scenes[1]?.run()))
        this.scenes.push(new ContentsScene(this.mother, () => this.scenes[2]?.run()))
        this.scenes.push(new EpilogueScene(this.mother))

        this.scenes[0].run()
    }

    update(dt: number): void {
        for (const scene of this.scenes) {
            if (!scene.enabled) continue
            scene.update(dt);

            // Alternative approach if you want to update all child objects
            /*scene.self.traverse((obj) => {
                if ('update' in obj && typeof obj['update'] === 'function' && obj.visible) {
                    obj['update'](dt)
                }
            })*/ 

           break
        }
    }

    onWindowResize(): void {
        this.camera.updateOrthoCamera(window.innerWidth, window.innerHeight)
    }
}