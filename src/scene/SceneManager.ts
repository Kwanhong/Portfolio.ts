import * as THREE from 'three'
import { Camera } from './Camera'
import { Lights } from './Lights'
import { Language } from '@data/Language'
import { Color } from '@data/Color'

import type { Scene } from './scenes/Scene'
import { MainScene } from './scenes/MainScene'
import { ContentsScene } from './scenes/ContentsScene'
import { EpilogueScene } from './scenes/EpilogueScene'
import { PerlinNoise } from '../core/PerlinNoise'

export class SceneManager {
    mother = new THREE.Scene()
    camera = new Camera()
    scenes: Array<Scene> = []

    constructor() {
        this.mother.background = Color.helper.get('background.primary')
        this.mother.add(this.camera.self)
        Lights.addToScene(this.mother)
        
        Language.helper.set('en')
        PerlinNoise.setSeed(Math.random() * 65536)

        let mainScene = new MainScene(this.mother, () => { this.scenes[1]?.run() })
        let contentsScene = new ContentsScene(this.mother, () => { this.scenes[0]?.run() }, () => { this.scenes[2]?.run() })
        let epilogueScene = new EpilogueScene(this.mother)

        this.scenes.push(mainScene)
        this.scenes.push(contentsScene)
        this.scenes.push(epilogueScene)

        this.scenes[0].run()
    }

    update(dt: number): void {
        for (const scene of this.scenes) {
            if (!scene.enabled) continue
            scene.update(dt); break
        }
    }

    onWindowResize(): void {
        this.camera.updateOrthoCamera(window.innerWidth, window.innerHeight)

        for (const scene of this.scenes) {
            if (!scene.enabled) continue
            scene.resize(); break
        }
    }
}