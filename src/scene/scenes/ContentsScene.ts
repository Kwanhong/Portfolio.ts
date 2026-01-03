import * as THREE from 'three'
import type { Scene } from './Scene'
import { UIOpaqueBlurButton } from '@ui/base/UIButton'
import { Camera } from '../Camera'
import { ContentStar } from '@objects/contents/ContentStar'
import { EventManager } from '../../event/EventManager'
import { Helper } from '../../core/Helper'
import { SceneObject } from '@objects/SceneObject'

export class ContentsScene implements Scene {

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

    private returnButton: UIOpaqueBlurButton
    private finishButton: UIOpaqueBlurButton
    private sun: ContentStar
    private currentStar: ContentStar
    private currentDepth: number = 0

    constructor(scene: THREE.Scene, onReturned: () => void = () => { }, onFinished: () => void = () => { }) {
        this.mother = scene
        this.mother.add(this.self)
        this.onFinished = onFinished
        this.onReturned = onReturned
        this.enabled = false

        // 텍스처 로드
        // const imageUrl = 'resources/4stageBackground.png'; // 인터넷 이미지 URL

        // const textureLoader = new THREE.TextureLoader();
        // textureLoader.load(imageUrl, (texture) => {
        //     const aspect = texture.image.width / texture.image.height;
        //     const geometry = new THREE.PlaneGeometry(aspect * Camera.size.width, Camera.size.height); // 높이를 기준으로 크기 조정
        //     const material = new THREE.MeshBasicMaterial({ map: texture });
        //     const mesh = new THREE.Mesh(geometry, material);

        //     mesh.position.set(0, 0, -200);
        //     this.self.add(mesh);
        // });

        const info = {
            title: '🌞',
            size: 100,
            radius: 190,
            depth: 0,

            substars: [
                {
                    title: '🌏',
                    size: 70,
                    index: 0,
                    radius: 35,
                    depth: 1,
                    onClick: () => {
                        this.setDepth(1, this.sun.substars[0])
                    },
                    substars: [
                        {
                            title: '🌑',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                // Go to Scene Moon 1-1
                            },
                        },
                        {
                            title: '🌒',
                            size: 12,
                            index: 1,
                            depth: 2,
                            onClick: () => {
                                // Go to Scene Moon 1-2
                            },
                        }
                    ]
                },
                {
                    title: '🪐',
                    size: 70,
                    index: 1,
                    radius: 35,
                    depth: 1,
                    onClick: () => {
                        this.setDepth(1, this.sun.substars[1])
                    },
                    substars: [
                        {
                            title: '🌓',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                // Go to Scene Moon 2-1
                            },
                        },
                    ]
                },
                {
                    title: '🌕',
                    size: 70,
                    index: 2,
                    depth: 1,
                    onClick: () => {
                        // Go to Scene Planet 3
                    },
                }
            ]
        }

        const sun = new ContentStar(info)
        const solarSystem = new SceneObject
        solarSystem.position.set(-45, -20, 0)
        this.self.add(solarSystem)
        solarSystem.add(sun)
        this.sun = sun
        this.currentStar = sun

        const returnButton = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: 'Return',
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
            text: 'Finish',
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
            if (!EventManager.self.pointerPressed) return;
            let star = this.currentStar
            const deltaX = this.lastPressedPointer.x - event.clientX
            const forceX = deltaX * 0.1
            this.lastPressedPointer.x = event.clientX
            this.lastPressedPointer.y = event.clientY
            const depthFactor = (star.info.depth + 1)
            star.applyForce(forceX * 5 * depthFactor);
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
    }

    private lastPressedPointer = new THREE.Vector3(0, 0, 0)

    run() {
        this.enabled = true
        this.resize()
    }

    refresh(): void {
        // Code to refresh or update the scene
    }

    update(dt: number): void {

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
        star.superstar?.button.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(superstarScaleFactor), 0.1)
        star.button.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)

        let subsubstars: ContentStar[] = []
        star.substars.forEach(s => {
            s.substars.forEach(ss => {
                subsubstars.push(ss)
            })
        })
        star.substars.forEach(s => {
            s.button.text.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        })
        subsubstars.forEach(ss => {
            ss.button.text.scale.lerp(new THREE.Vector3(0, 0, 0), 0.1)
        })

        let selectedNone = true
        star.substars.forEach((s) => {
            if (s.button.status != 'blur') {
                selectedNone = false
                return
            }
        })
        if (EventManager.self.pointerPressed && selectedNone) {
            let radius = (star.info.radius ?? 100) * 0.5
            if (this.currentDepth === 1) {
                radius = (star.info.radius ?? 100) * 2.2
            }
            star.radius = Helper.lerp(star.radius, radius, 0.1)
            star.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9).multiplyScalar(star.info.depth + 1), 0.1)
            star.poleX = Helper.lerp(star.poleX, 40, 0.1)
        } else {
            let radius = star.info.radius ?? 100
            if (this.currentDepth === 1) {
                radius = (star.info.radius ?? 100) * 2.5
            }
            star.radius = Helper.lerp(star.radius, radius, 0.1)
            star.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(star.info.depth + 1), 0.1)
            star.poleX = Helper.lerp(star.poleX, 30, 0.1)
        }

        star.update(dt)
    }

    resize(): void {
        const margin = 10
        this.finishButton.position.set(Camera.size.width / 2 - this.finishButton.size.width / 2 - margin, -Camera.size.height / 2 + this.finishButton.size.height / 2 + margin, 0)
        this.returnButton.position.set(-Camera.size.width / 2 + this.returnButton.size.width / 2 + margin, -Camera.size.height / 2 + this.returnButton.size.height / 2 + margin, 0)
    }

    return(): void {
        this.enabled = false
        this.onReturned?.()
    }

    finish(): void {
        this.enabled = false
        this.onFinished?.()
    }
}