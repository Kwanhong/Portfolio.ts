import * as THREE from 'three'
import { Camera } from './Camera'
import { Lights } from './Lights'
import { Language } from '@data/Language'
import { Color } from '@data/Color'

import type { Scene } from './scenes/Scene'
import { MainScene } from './scenes/MainScene'
import { OverlayScene } from './scenes/OverlayScene'
import { ContentsScene } from './scenes/contents/ContentsScene'
import { EpilogueScene } from './scenes/EpilogueScene'
import { PerlinNoise } from '../core/PerlinNoise'
import { ContentScene } from './scenes/contents/ContentScene'
import { Data } from '@data/Info'
import { UIButton } from '@ui/base/UIButton'
import { UIScrollView } from '@ui/components/UIScrollView'

export class SceneManager {
    mother = new THREE.Scene()
    camera = new Camera()
    private scenes: Array<Scene> = []
    private overlay: OverlayScene

    static self?: SceneManager = undefined;

    constructor() {
        SceneManager.self = this;
        this.mother.background = Color.helper.get('background.primary')
        this.mother.add(this.camera.self)
        Lights.addToScene(this.mother)

        Language.helper.set('en')
        PerlinNoise.setSeed(Math.random() * 65536)

        let mainScene = new MainScene(this.mother, () => {
            this.scenes[1]?.run()
            if (this.overlay.alreadyDisplayed[1]) {
                this.overlay.finish()
                return
            }
            else {
                this.recursivelySetUIButtonEnabled(this.scenes[1].self, false)
            }
            this.overlay.setOverlay(Data.getOverlayInfo(1));
            this.overlay.run()
        })
        let contentScene = new ContentScene(this.mother, () => {
            this.scenes[1]?.run()
        })
        let contentsScene = new ContentsScene(this.mother, () => {
            this.scenes[0]?.run()
        }, (info) => {
            contentScene.infos = info
            contentScene.run()
            if (this.overlay.alreadyDisplayed[2]) {
                this.overlay.finish()
                return
            }
            else {
                this.recursivelySetUIButtonEnabled(this.scenes[2].self, false)
            }
            this.overlay.setOverlay(Data.getOverlayInfo(2));
            this.overlay.run()
        }, () => {
            this.scenes[3]?.run()
            this.overlay.setOverlay(Data.getOverlayInfo(3));
            this.overlay.run()
        })

        let epilogueScene = new EpilogueScene(this.mother, ()=> {
            this.scenes[0]?.run()
        })

        this.scenes.push(mainScene)
        this.scenes.push(contentsScene)
        this.scenes.push(contentScene)
        this.scenes.push(epilogueScene)

        this.scenes[0].run()


        this.recursivelySetUIButtonEnabled(this.scenes[0].self, false)
        this.overlay = new OverlayScene(this.mother, () => {
            for (const scene of this.scenes) {
                this.recursivelySetUIButtonEnabled(scene.self, true)
            }
        })
        this.overlay.run()
        this.overlay.setOverlay(Data.getOverlayInfo(0));
    }

    recursivelySetUIButtonEnabled(object: THREE.Object3D, enabled: boolean = true) {
        object.traverse((child) => {
            const uiButton = child as UIButton;
            if (uiButton && uiButton instanceof UIButton) {
                uiButton.eventEnabled = enabled;
            }
            const scrollView = child as UIScrollView;
            if (scrollView && scrollView instanceof UIScrollView) {
                scrollView.eventEnabled = enabled;
            }
        });
    }

    update(dt: number): void {
        this.overlay.update(dt);
        for (const scene of this.scenes) {
            if (!scene.enabled) continue
            scene.update(dt); break
        }
    }

    onWindowResize(): void {
        this.camera.updateOrthoCamera(window.innerWidth, window.innerHeight)
        this.overlay.resize();
        for (const scene of this.scenes) {
            if (!scene.enabled) continue
            scene.resize(); break
        }
    }
}