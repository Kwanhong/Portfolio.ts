import * as THREE from 'three'
import type { Scene } from './Scene'
import { UIScrollView } from '@ui/components/UIScrollView'
import { Camera } from '../Camera'
import { UIOpaqueBlurButton, type UIButton } from '@ui/base/UIButton'
import type { UIObject } from '@ui/base/UIObject'
import { defaultBaselineStyle, defaultDescriptionStyle, defaultHeadlineStyle } from '@ui/styles/TextStyle'
import { Language } from '@data/Language'
import { Time } from '../../core/Time'
import { Color } from '@data/Color'
import { Helper } from '../../core/Helper'
import { UIText } from '@ui/base/UIText'
import { Data, type contentInfo, type contentsInfo } from '@data/Info'
import { UIVideoView } from '@ui/components/UIVideoView'
import { UIView } from '@ui/base/UIView'
import { UIImageView } from '@ui/components/UIImageView'
import { FileManager } from '../../core/FIleManager'

export class EpilogueScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined

    private returnButton: UIButton
    private scrollView: UIScrollView
    private dimmer: THREE.Mesh
    private needsToResize: boolean = false
    private anchors: UIObject[] = []
    private autoScrollFactor: number = 10;

    private _enabled: boolean = false;
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    constructor(scene: THREE.Scene, onFinished: () => void = () => { }) {
        this.mother = scene
        this.mother.add(this.self)
        this.onFinished = onFinished
        this.enabled = false

        const scrollView = new UIScrollView({ x: 0, y: 0, width: Camera.size.width, height: Camera.size.height - 50 })
        scrollView.position.set(0, 25, -200)
        this.scrollView = scrollView;
        this.self.add(this.scrollView);

        const returnButton = new UIOpaqueBlurButton({
            width: 80,
            height: 36,
            cornerRadius: 18,
            style: { ...defaultBaselineStyle, fontSize: 11, anchorX: 'center', textAlign: 'center' },
            text: Language.helper.get('content.button.back'),
            onClick: () => { this.finish() }
        })
        returnButton.text.textKey = 'content.button.back'
        this.self.add(returnButton)
        this.returnButton = returnButton

        const dimmerGeometry = new THREE.PlaneGeometry(Camera.size.width, Camera.size.height);
        const dimmerMaterial = new THREE.MeshBasicMaterial({ color: Color.helper.get('background.primary'), opacity: 1.0, transparent: true });
        const dimmer = new THREE.Mesh(dimmerGeometry, dimmerMaterial);

        this.self.add(dimmer);
        this.dimmer = dimmer
    }

    run() {
        this.enabled = true

        const margin = 10;
        this.returnButton.position.set(
            -Camera.size.width / 2 + this.returnButton.size.width / 2 + margin,
            -Camera.size.height / 2 + this.returnButton.size.height / 2 + margin, 0
        );

        if (!this.scrollView.isEmpty) {
            this.scrollView.scrollTo(0);
            return;
        }

        const info = Data.epilogueInfo;
        this.constructHeadline(info, this.scrollView);
        this.constructContents(info, this.scrollView);
    }

    constructHeadline(infos: contentsInfo, scrollView: UIScrollView) {

        const headline = new UIText(Language.helper.get('use.string.key', infos.title), {
            ...defaultHeadlineStyle, anchorX: 'left', anchorY: 'top', textAlign: 'left', lineHeight: 1.4
        });

        headline.position.set(-scrollView.size.width / 2 + 10, scrollView.size.height / 2 - 10, 0);
        headline.setSize({ width: scrollView.size.width, height: scrollView.size.height });
        scrollView.addStack(headline);
    }

    constructContents(infos: contentsInfo, scrollView: UIScrollView) {

        let waitCnt = 0
        const contents: UIObject[] = []

        for (const info of infos.contents) {

            if (info.button) {
                this.constructButton(info, contents)
            }

            if (info.text) {
                waitCnt++
                this.constructText(info, scrollView, contents, () => { waitCnt-- })
            }

            if (info.imageUrl) {
                waitCnt++
                this.constructImageView(info, contents, () => { waitCnt-- })
            }

            if (info.videoUrl) {
                waitCnt++
                this.constructVideoView(info, contents, () => { waitCnt-- })
            }

            if (info.customView) {
                this.anchors.push(info.customView(this.scrollView))
            }
        }

        for (const content of contents) {
            scrollView.addStack(content)
        }

        this.startDimmerFadeOut(() => waitCnt === 0)
    }

    startDimmerFadeOut(condition: () => boolean): void {

        const material = this.dimmer.material as THREE.MeshBasicMaterial;
        material.opacity = 1.0;
        Time.coroutine(condition, () => { }, () => {
            this.needsToResize = true
            Time.coroutineSec(0.3, () => { }, () => {
                this.scrollView?.scrollTo(0)
                Time.coroutineSec(0.5, () => {
                    const opacity = Helper.lerp(material.opacity, 0, 0.1);
                    material.opacity = opacity;
                }, () => {
                    material.opacity = 0.0;
                });
            });
        });
    }

    constructButton(info: contentInfo, contents: UIObject[]) {

        if (!info.button) return;

        const button = new UIOpaqueBlurButton({
            width: Camera.size.width - 20,
            height: info.height,
            text: Language.helper.get('use.string.key', info.button.title),
            onClick: () => info.button!.onClick(),
            style: { ...defaultDescriptionStyle, ...info.button.textStyle }
        });

        contents.push(button)
    }

    constructText(info: contentInfo, scrollView: UIScrollView, contents: UIObject[], finished: () => void) {

        if (!info.text) return;

        const text = new UIText(Language.helper.get('use.string.key', info.text.text), {
            ...defaultDescriptionStyle, anchorX: 'left', anchorY: 'top', ...info.text.textStyle
        }, finished);

        text.position.set(-scrollView.size.width / 2 + 10, scrollView.size.height / 2 - 10, 0);
        text.setSize({ width: scrollView.size.width, height: scrollView.size.height });

        contents.push(text)
    }

    constructImageView(info: contentInfo, contents: UIObject[], finished: () => void) {

        if (!info.imageUrl) return;
        const imageContainer = new UIView({ x: 0, y: 0, width: 500, height: info.height }, 20)
        FileManager.loadTexture(info.imageUrl).then((texture) => {

            const image = texture.image as HTMLImageElement

            if (image) {
                const aspect = image.width / image.height
                const finalWidth = 440
                const finalHeight = finalWidth / aspect
                const imageView = new UIImageView({ x: 0, y: -10, width: finalWidth, height: finalHeight }, texture, 15);

                imageContainer.add(imageView);
                imageView.position.z = 100;
                imageContainer.size = { width: finalWidth, height: finalHeight + 20 };
            }

            finished();
        }).catch(() => {
            finished();
        });

        contents.push(imageContainer);
    }

    constructVideoView(info: contentInfo, contents: UIObject[], finished: () => void) {

        if (!info.videoUrl) return;

        const videoContainer = new UIView({ x: 0, y: 40, width: 500, height: info.height }, 20)

        // 비디오 메타데이터를 로드해서 dimensions 가져오기
        const video = document.createElement('video')
        video.src = info.videoUrl
        video.preload = 'metadata'

        video.onloadedmetadata = () => {
            const aspect = video.videoWidth / video.videoHeight
            const finalWidth = 440
            const finalHeight = finalWidth / aspect
            const videoView = new UIVideoView({ x: 0, y: -10, width: finalWidth, height: finalHeight }, info.videoUrl!, 15);
            videoContainer.add(videoView);
            videoContainer.size = { width: finalWidth, height: finalHeight + 20 };
            videoView.alwaysPlay = true;
            videoView.playVideo();
            finished();
        }

        video.onerror = () => {
            // 에러 시 기본 크기로 생성
            const videoView = new UIVideoView({ x: 0, y: -10, width: 440, height: info.height - 20 }, info.videoUrl!, 15);
            videoContainer.add(videoView);
            videoView.alwaysPlay = true;
            videoView.playVideo();
            finished();
        }

        contents.push(videoContainer);
    }

    update(dt: number): void {

        const height = this.scrollView.contentView.size.height;
        if (height > this.scrollView.size.height) {
            this.scrollView.contentView.translateY(this.autoScrollFactor * dt);
        } 
        
        if (!this.enabled) return;
        this.scrollView?.update(dt);

        this.returnButton.update(dt);
        if (this.needsToResize) {
            this.resize();
            this.needsToResize = false;
        }
    }

    refresh(): void {
    }

    resize(): void {

        const margin = 10;
        this.returnButton.position.set(
            -Camera.size.width / 2 + this.returnButton.size.width / 2 + margin,
            -Camera.size.height / 2 + this.returnButton.size.height / 2 + margin, 0
        );

        this.dimmer.geometry.dispose();
        this.dimmer.geometry = new THREE.PlaneGeometry(Camera.size.width, Camera.size.height);

        Time.coroutineSec(0.2, () => {
            this.scrollView?.setSize({ width: Camera.size.width - 20, height: Camera.size.height - 70 });
        }, () => {
            this.scrollView?.setSize({ width: Camera.size.width - 20, height: Camera.size.height - 70 });
        });

        this.anchors.forEach(anchor => {
            anchor.position.set(-Camera.size.width / 2 + 30, 0, 0)
        });
    }

    finish(): void {
        this.onFinished?.()
        this.enabled = false
    }
}   