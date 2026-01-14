import * as THREE from 'three'
import type { Scene } from './Scene'
import { UIOpaqueBlurButton } from '@ui/base/UIButton'
import { Camera } from '../Camera'
import { ContentStar, type starInfo } from '@objects/contents/ContentStar'
import { EventManager } from '../../event/EventManager'
import { Helper } from '../../core/Helper'
import { SceneObject } from '@objects/SceneObject'
import { BackgroundField } from '@ui/contents/BackgroundField'
import { Language } from '@data/Language'
import type { contentsInfo } from './contents/ContentScene'
import { defaultBaselineStyle, defaultDescriptionStyle, type TextStyle } from '@ui/styles/TextStyle'
import { UIImageView } from '@ui/base/UIImageView'
import { UIView } from '@ui/base/UIView'
import { FileManager } from '../../core/FIleManager'
import { UIText } from '@ui/base/UIText'
import { UIObject } from '@ui/base/UIObject'

export class ContentsScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined
    onReturned?: (() => void) | undefined
    onProceeded?: ((info?: contentsInfo) => void) | undefined

    private _enabled: boolean = false;
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    private returnButton: UIOpaqueBlurButton
    private finishButton: UIOpaqueBlurButton
    private sun: ContentStar
    private currentStar: ContentStar
    private currentDepth: number = 0
    private backgroundField: BackgroundField

    constructor(scene: THREE.Scene, onReturned: () => void = () => { }, onProceeded: (infos?: contentsInfo) => void = () => { }, onFinished: () => void = () => { }) {
        
        this.mother = scene;
        this.mother.add(this.self);
        this.onFinished = onFinished;
        this.onReturned = onReturned;
        this.onProceeded = onProceeded;
        this.enabled = false;

        this.backgroundField = new BackgroundField(Camera.size, 37)
        this.backgroundField.position.set(-12, 24, -250)
        this.self.add(this.backgroundField)

        const hangulContents: contentsInfo = {
            title: 'content.unity.smarthangul.title',
            contents: [
                {
                    customView: (scrollView) => {
                        const view = new UIView({x:0, y:0, width:300, height:150}, 47)
                        
                        const leftAnchor = new UIObject()
                        leftAnchor.position.set(0, 0, 0)
                        view.add(leftAnchor)

                        FileManager.loadTexture('resources/appIcon_smart.png').then((texture) => {
                            const imageView = new UIImageView(
                                {x:65, y:-10, width:130, height:130},
                                texture, 37
                            )
                            imageView.position.set(0, 0, 100)
                            leftAnchor.add(imageView)
                        })

                        const author = new UIText(Language.helper.get('content.unity.smarthangul.author'), {
                            ...defaultDescriptionStyle,
                            fontSize: 12,
                        }, (_, size) => {
                            const role = new UIText(Language.helper.get('content.unity.smarthangul.role'), {
                                ...defaultDescriptionStyle,
                                fontSize: 12,
                            })
                            role.position.set(265, -size.height - 50, 0)
                            role.setSize({width: 230, height: 50})
                            leftAnchor.add(role)
                        })

                        author.setSize({width: 230, height: 130})
                        author.position.set(265, -20, 100)
                        leftAnchor.add(author)
                        
                        const style: TextStyle = { ...defaultBaselineStyle, fontSize: 10, anchorX: 'center', anchorY: 'middle', textAlign: 'center' }
                        const btnAppstore = new UIOpaqueBlurButton({
                            width: 30,
                            height: 30,
                            cornerRadius: 8,
                            text: 'APP',
                            style: style,
                            onClick: () => {
                                window.open('https://apps.apple.com/kr/app/%EC%8A%A4%EB%A7%88%ED%8A%B8-%ED%95%9C%EA%B8%80%EC%9D%B4-%ED%81%AC%EB%8A%94-%EB%82%98%EB%AC%B4/id1478712894', '_blank')
                            }
                        })

                        const btnGithub = new UIOpaqueBlurButton({
                            width: 30,
                            height: 30,
                            cornerRadius: 8,
                            text: 'GIT',
                            style: style,
                            onClick: () => {
                                window.open('https://github.com/Kwanhong', '_blank')   
                            }
                        })

                        btnGithub.position.set(203, -111, 0)
                        leftAnchor.add(btnGithub)
                        btnAppstore.position.set(163, -111, 0)
                        leftAnchor.add(btnAppstore)


                        scrollView.addStack(view)

                        return leftAnchor
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description',
                        textStyle: defaultDescriptionStyle,
                    },
                    height: 300,
                }, 
                {
                    text: {
                        text: 'content.unity.smarthangul.description.sub',
                        textStyle: defaultDescriptionStyle,
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.role.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14, fontWeight: 'bold' },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.role.detail',
                        textStyle: defaultDescriptionStyle,
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.role.detail.subtitle',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14, fontWeight: 'bold' },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.role.detail.sub',
                        textStyle: defaultDescriptionStyle,
                    },
                    height: 150,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14, fontWeight: 'bold' },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.detail',
                        textStyle: defaultDescriptionStyle,
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.detail.subtitle.animation',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14, fontWeight: 'bold' },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video.mov',
                    height: 340,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.detail.subtitle.video',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14, fontWeight: 'bold' },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video.mov',
                    height: 340,
                },
            ]
        }

        const unitySubstars: starInfo[] = [
            {
                title: 'contents.unity.substar.smarthangul',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
                contents: hangulContents,
            },
            {
                title: 'contents.unity.substar.cheonjaeedu',
                fontSize: 5,
                size: 25,
                index: 1,
                depth: 2,
            },
            {
                title: 'contents.unity.substar.soomgo',
                fontSize: 5,
                size: 25,
                index: 2,
                depth: 2,
            },
        ]

        const iosSubstars: starInfo[] = [
            {
                title: 'contents.ios.substar.minirecord',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
            },
            {
                title: 'contents.ios.substar.jump',
                fontSize: 5,
                size: 25,
                index: 1,
                depth: 2,
            },
        ]

        const mediaSubstars: starInfo[] = [
            {
                title: 'contents.media.substar.minirecord',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
            }, {
                title: 'contents.media.substar.jump',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
            },
        ]

        const arSubstars: starInfo[] = [
            {
                title: 'contents.ar.substar.jump',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
            },
            {
                title: 'contents.ar.substar.minirecord',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
            },
        ]

        const graphicsSubstars: starInfo[] = [
            {
                title: 'contents.graphics.substar.metal',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
            },
        ]

        const substars: starInfo[] = [
            {
                title: 'contents.substar.unity',
                fontSize: 10,
                size: 70,
                index: 0,
                radius: 38,
                depth: 1,
                substars: unitySubstars
            },
            {
                title: 'contents.substar.ios',
                fontSize: 10,
                size: 70,
                index: 1,
                radius: 38,
                depth: 1,
                substars: iosSubstars
            },
            {
                title: 'contents.substar.media',
                fontSize: 10,
                size: 70,
                index: 2,
                depth: 1,
                radius: 38,
                substars: mediaSubstars
            },
            {
                title: 'contents.substar.ar',
                fontSize: 10,
                size: 70,
                index: 3,
                depth: 1,
                radius: 38,
                substars: arSubstars
            },
            {
                title: 'contents.substar.graphics',
                fontSize: 10,
                size: 70,
                index: 4,
                depth: 1,
                radius: 38,
                substars: graphicsSubstars
            }
        ]

        const info = {
            title: 'contents.title',
            fontSize: 14,
            size: 100,
            radius: 150,
            depth: 0,
            substars: substars
        }

        for (let substar of substars) {
            substar.onClick = () => {
                this.setDepth(1, this.sun.substars[substar.index!])
            }
            for (let subsubstar of substar.substars!) {
                subsubstar.onClick = () => {
                    this.proceed(subsubstar)
                }
            }
        }

        const sun = new ContentStar(info)
        const solarSystem = new SceneObject
        solarSystem.position.set(0, 20, 0)
        this.self.add(solarSystem)
        solarSystem.add(sun)
        this.sun = sun
        this.currentStar = sun

        const returnButton = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: Language.helper.get('contents.button.back'),
            onClick: () => {
                if (this.currentDepth > 0) {
                    this.setDepth(this.currentDepth - 1, this.currentStar.superstar!)
                } else {
                    this.return()
                }
            }
        })

        this.self.add(returnButton)

        const finishButton = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: Language.helper.get('contents.button.finish'),
            onClick: () => {
                this.finish()
            }
        })

        this.self.add(finishButton)

        this.returnButton = returnButton
        this.finishButton = finishButton

        EventManager.self.addPointerDownListener((event) => {
            this.lastPressedPointer.x = event.clientX
        });

        EventManager.self.addPointerMoveListener((event) => {
            if (!this.enabled) return;
            if (!EventManager.self.pointerPressed) return;
            let star = this.currentStar
            let deltaX = this.lastPressedPointer.x - event.clientX
            let deltaY = event.clientY - this.lastPressedPointer.y

            if (event.clientY < Camera.size.height / 2) {
                deltaX *= -1
            }
            if (event.clientX < Camera.size.width / 2) {
                deltaY *= -1
            }
            const forceX = deltaX + deltaY
            this.lastPressedPointer.x = event.clientX
            this.lastPressedPointer.y = event.clientY
            const depthFactor = (star.info.depth * 0.7 + 1)
            let force = forceX * depthFactor * 0.25
            force = Math.min(Math.max(force, -10), 10);
            star.applyForce(force);
        });

        EventManager.self.addPointerUpListener((event) => {
            if (!this.enabled) return;

        });
    }

    setDepth(depth: number, star: ContentStar) {
        this.currentStar.radius = this.currentStar.info.radius ?? 100
        if (depth > this.currentDepth) {
            star.button.eventEnabled = false
            star.substars.forEach(s => s.button.eventEnabled = true)
            const superstarScaleFactor = 3
            const width = Camera.size.width / 2 + star.info.size * superstarScaleFactor
            const height = Camera.size.height / 2 + star.info.size * superstarScaleFactor
            star.baseAnchor = new THREE.Vector3(width, height)
        } else {
            this.currentStar.substars.forEach(s => s.button.eventEnabled = false)
            this.currentStar.button.eventEnabled = true
        }
        this.currentDepth = depth
        this.currentStar = star

        this.currentStar.applyForce(50);
        this.backgroundField.setDepth(depth);
    }

    private lastPressedPointer = new THREE.Vector3(0, 0, 0)

    run() {
        this.enabled = true
        this.resize()
        if (this.currentDepth === 0) {
            this.backgroundField.run();
        }
        this.sun.applyForce(100);
    }

    refresh(): void {
        // Code to refresh or update the scene
    }

    update(dt: number): void {

        this.backgroundField.update(dt);

        if (!this.enabled) return
        let star = this.currentStar

        let radius = 10
        let pointer = new THREE.Vector3(
            this.lastPressedPointer.x - Camera.size.width / 2,
            -(this.lastPressedPointer.y - Camera.size.height / 2), 0
        )

        let starPos = pointer.clone().normalize().multiplyScalar(radius).add(star.baseAnchor)
        star.position.lerp(starPos, 0.1)

        const superstarScaleFactor = 3
        star.superstar?.position.lerp(star.baseAnchor.clone().multiplyScalar(-1), 0.1)
        star.superstar?.button.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(superstarScaleFactor), 0.2)
        star.button.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2)

        let subsubstars: ContentStar[] = []
        star.substars.forEach(s => {
            s.substars.forEach(ss => {
                subsubstars.push(ss)
            })
        })

        star.substars.forEach(s => {
            s.button.text.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2)
        })
        subsubstars.forEach(ss => {
            ss.button.text.scale.lerp(new THREE.Vector3(0, 0, 0), 0.2)
        })

        let selectedNone = true
        star.substars.forEach((s) => {
            if (s.button.status != 'blur') {
                selectedNone = false
                return
            }
        })
        if (EventManager.self.pointerPressed && selectedNone) {
            let radius = (star.info.radius ?? 100) * 0.75
            if (this.currentDepth === 1) {
                radius = (star.info.radius ?? 100) * 2.2
            }
            star.radius = Helper.lerp(star.radius, radius, 0.2)
            star.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9).multiplyScalar(star.info.depth * 0.7 + 1), 0.2)
            star.pole = Helper.lerp(star.pole, 90, 0.2)
            for (let substar of star.substars) {
                // substar.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(substar.info.depth * 0.7 + 1), 0.2)
                substar.pole = Helper.lerp(substar.pole, 90, 0.2)
            }
        } else {
            let radius = star.info.radius ?? 100
            if (this.currentDepth === 1) {
                radius = (star.info.radius ?? 100) * 2.5
            }
            star.radius = Helper.lerp(star.radius, radius, 0.2)
            star.pole = Helper.lerp(star.pole, 45, 0.2)
            star.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(star.info.depth * 0.7 + 1), 0.2)
            for (let substar of star.substars) {
                // substar.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(substar.info.depth * 0.7 + 1), 0.2)    
                substar.pole = Helper.lerp(substar.pole, 45, 0.2)
            }
        }

        star.update(dt)
    }

    resize(): void {
        const margin = 10;
        this.finishButton.position.set(
            Camera.size.width / 2 - this.finishButton.size.width / 2 - margin,
            -Camera.size.height / 2 + this.finishButton.size.height / 2 + margin,
            0
        );
        this.returnButton.position.set(
            -Camera.size.width / 2 + this.returnButton.size.width / 2 + margin,
            -Camera.size.height / 2 + this.returnButton.size.height / 2 + margin,
            0
        );
    }

    return(): void {
        this.enabled = false
        this.onReturned?.()
    }

    proceed(info: starInfo): void {
        this.enabled = false
        this.onProceeded?.(info.contents)
    }

    finish(): void {
        this.enabled = false
        this.onFinished?.()
    }
}