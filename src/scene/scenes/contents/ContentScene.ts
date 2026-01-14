import * as THREE from 'three'
import type { Scene } from '../Scene'
import { UIScrollView } from '@ui/base/UIScrollView'
import type { starInfo } from '@objects/contents/ContentStar'
import { UIButton, UIOpaqueBlurButton } from '@ui/base/UIButton'
import { Camera } from '../../Camera'
import { UIText } from '@ui/base/UIText'
import { defaultHeadlineStyle, defaultBaselineStyle, defaultDescriptionStyle, type TextStyle } from '@styles/TextStyle'
import { Time } from '../../../core/Time'
import { UIImageView } from '@ui/base/UIImageView'
import { FileManager } from '../../../core/FIleManager'
import { UIView } from '@ui/base/UIView'
import { UIVideoView } from '@ui/base/UIVideoView'
import type { UIObject } from '@ui/base/UIObject'
import { Language } from '@data/Language'

export type textInfo = {
    text: string,
    textStyle?: TextStyle
}

export type buttonInfo = {
    title: string,
    textStyle?: TextStyle,
    onClick: () => void,
}

export type contentInfo = {
    text?: textInfo,
    button?: buttonInfo,
    imageUrl?: string,
    videoUrl?: string,
    height: number,
    customView?: (scrollView: UIScrollView)=>UIObject,
}

export type contentsInfo = {
    title: string,
    contents: contentInfo[],
}

export class ContentScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined
    onReturned?: (() => void) | undefined

    private _enabled: boolean = false;
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    private returnButton: UIButton
    private scrollView?: UIScrollView
    infos?: contentsInfo
    private needsToResize: boolean = false
    private anchors: UIObject[] = []

    constructor(scene: THREE.Scene, onReturned: () => void = () => { }, onFinished: () => void = () => { }) {
        this.mother = scene
        this.mother.add(this.self)
        this.onFinished = onFinished
        this.enabled = false
        this.onReturned = onReturned

        const returnButton = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: 'Back',
            onClick: () => { this.return() }
        })
        this.self.add(returnButton)
        this.returnButton = returnButton

        const scrollView = new UIScrollView({ x: 0, y: 0, width: Camera.size.width - 20, height: Camera.size.height - 70 })
        scrollView.position.set(0, 25, -200)
        this.self.add(scrollView)
        this.scrollView = scrollView

    }

    run() {
        this.enabled = true

        if (!this.scrollView) return;

        this.scrollView.scrollTo(0);
        this.scrollView.clearStack();
        Time.coroutineSec(0.1, () => {}, () => {
            this.needsToResize = true
        });
        this.anchors.forEach(anchor => {
            anchor.removeFromParent()
        });
        this.anchors = []

        if (!this.infos) return;

        const headline = new UIText(Language.helper.get('use.string.key', this.infos.title), { ...defaultHeadlineStyle, anchorX: 'left', anchorY: 'top' });
        headline.position.set(-this.scrollView.size.width / 2 + 10, this.scrollView.size.height / 2 - 10, 0);
        headline.setSize({ width: this.scrollView.size.width, height: this.scrollView.size.height });
        this.scrollView.addStack(headline);

        const contents: UIObject[] = []
        for (const info of this.infos?.contents ?? []) {
            if (info.button) {
                const button = new UIOpaqueBlurButton({
                    width: Camera.size.width - 20,
                    height: info.height,
                    text: Language.helper.get('use.string.key', info.button.title),
                    onClick: () => {
                    }
                });
                contents.push(button)
            }

            if (info.text) {
                const text = new UIText(Language.helper.get('use.string.key', info.text.text), { ...defaultDescriptionStyle, anchorX: 'left', anchorY: 'top', ...info.text.textStyle });
                text.position.set(-this.scrollView.size.width / 2 + 10, this.scrollView.size.height / 2 - 10, 0);
                text.setSize({ width: this.scrollView.size.width, height: this.scrollView.size.height });
                contents.push(text)
            }

            if (info.imageUrl) {
                const imageContainer = new UIView({ x: 0, y: 0, width: 500, height: 330 }, 20)
                FileManager.loadTexture(info.imageUrl).then((texture) => {

                    const height = Camera.size.height - 20
                    const image = texture.image as HTMLImageElement

                    if (image) {
                        const width = height * (image.width / image.height)
                        const imageView = new UIImageView({ x: 0, y: -10, width: width, height: height }, texture, 15);
                        imageContainer.add(imageView);
                        imageView.position.z = 100;
                        imageContainer.size = { width: width, height: height + 20 };
                    }
                });
                contents.push(imageContainer);
            }

            if (info.videoUrl) {
                const videoContainer = new UIView({ x: 0, y: 40, width: 500, height: 330 }, 20)
                const videoView = new UIVideoView({ x: 0, y: -10, width: 440, height: 310 }, 'resources/video.mov', 15);
                videoContainer.add(videoView);
                videoView.videoPlayer.play();
                contents.push(videoContainer);
            }

            if (info.customView) {
                this.anchors.push(info.customView(this.scrollView!))
            }
        }

        for (const content of contents) {
            this.scrollView.addStack(content)
        }
    }

    refresh(): void {
        // Code to refresh or update the scene
    }

    update(dt: number): void {
        if (!this.enabled) return;
        this.scrollView?.update(dt);

        if (this.needsToResize) {
            this.resize();
            this.needsToResize = false;
        }
        // Update logic for EpilogueScene if needed
    }

    resize(): void {
        const margin = 10;

        this.returnButton.position.set(
            -Camera.size.width / 2 + this.returnButton.size.width / 2 + margin,
            -Camera.size.height / 2 + this.returnButton.size.height / 2 + margin, 0
        );

        Time.coroutineSec(0.2, () => {
            this.scrollView?.setSize({ width: Camera.size.width - 20, height: Camera.size.height - 70 });
        }, () => {
            this.scrollView?.setSize({ width: Camera.size.width - 20, height: Camera.size.height - 70 });
        });

        this.anchors.forEach(anchor => {
            anchor.position.set(-Camera.size.width / 2 + 30, 0, 0)
        });
    }

    return(): void {
        this.enabled = false
        this.onReturned?.()
    }

    finish(): void {
        // Code to execute when the scene is finished
        this.enabled = false
        this.onFinished?.()
    }
}