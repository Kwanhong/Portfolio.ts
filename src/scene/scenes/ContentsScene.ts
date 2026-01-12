import * as THREE from 'three'
import type { Scene } from './Scene'
import { UIOpaqueBlurButton } from '@ui/base/UIButton'
import { Camera } from '../Camera'
import { ContentStar, type starInfo } from '@objects/contents/ContentStar'
import { EventManager } from '../../event/EventManager'
import { Helper } from '../../core/Helper'
import { SceneObject } from '@objects/SceneObject'
import { BackgroundField } from '@ui/contents/BackgroundField'

export class ContentsScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined
    onReturned?: (() => void) | undefined
    onProceeded?: ((info: starInfo) => void) | undefined

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

    constructor(scene: THREE.Scene, onReturned: () => void = () => { }, onProceeded: (info: starInfo) => void = () => { }, onFinished: () => void = () => { }) {
        this.mother = scene;
        this.mother.add(this.self);
        this.onFinished = onFinished;
        this.onReturned = onReturned;
        this.onProceeded = onProceeded;
        this.enabled = false;

        this.backgroundField = new BackgroundField(Camera.size, 40)
        this.self.add(this.backgroundField)

        const info = {
            title: 'PORTFOLiO',
            size: 100,
            radius: 150,
            depth: 0,
            substars: [
                {
                    title: 'UNITY',
                    size: 70,
                    index: 0,
                    radius: 38,
                    depth: 1,
                    onClick: () => {
                        this.setDepth(1, this.sun.substars[0])
                    },
                    substars: [
                        {
                            title: 'SH',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌑',
                                    size: 12,
                                    depth: 2
                                })
                            },
                        },
                        {
                            title: 'CE',
                            size: 12,
                            index: 1,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌒',
                                    size: 12,
                                    depth: 2
                                })
                                // Go to Scene Moon 1-2
                            },
                        },
                        {
                            title: 'SG',
                            size: 12,
                            index: 2,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌓',
                                    size: 12,
                                    depth: 2
                                })
                                // Go to Scene Moon 1-3
                            },
                        },
                        {
                            title: 'MR',
                            size: 12,
                            index: 3,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌔',
                                    size: 12,
                                    depth: 2
                                })
                                // Go to Scene Moon 1-4
                            },
                        }
                    ]
                },
                {
                    title: 'iOS',
                    size: 70,
                    index: 1,
                    radius: 38,
                    depth: 1,
                    buttonImageUrl: 'resources/appIcon_none.png',
                    onClick: () => {
                        this.setDepth(1, this.sun.substars[1])
                    },
                    substars: [
                        {
                            title: 'BM',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌓',
                                    size: 12,
                                    depth: 2,
                                })
                            },
                        },
                        {
                            title: 'JP2',
                            size: 12,
                            index: 1,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌔',
                                    size: 12,
                                    depth: 2,
                                })
                            },
                        },
                    ]
                },
                {
                    title: 'Media',
                    size: 70,
                    index: 2,
                    depth: 1,
                    radius: 38,
                    onClick: () => {
                        this.setDepth(1, this.sun.substars[2])
                    },
                    substars: [
                        {
                            title: 'MR',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌕',
                                    size: 12,
                                    depth: 2
                                })
                            },
                        }, {
                            title: 'JP',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌕',
                                    size: 12,
                                    depth: 2
                                })
                            },
                        },
                    ]
                },
                {
                    title: 'AR',
                    size: 70,
                    index: 3,
                    depth: 1,
                    radius: 38,
                    onClick: () => {
                        this.setDepth(1, this.sun.substars[3])
                    },
                    substars: [
                        {
                            title: 'JP1',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌖',
                                    size: 12,
                                    depth: 2
                                })
                            },
                        },
                        {
                            title: 'JP2',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌖',
                                    size: 12,
                                    depth: 2
                                })
                            },
                        },
                        {
                            title: 'ARR',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌖',
                                    size: 12,
                                    depth: 2
                                })
                            },
                        },
                    ]
                },
                {
                    title: 'Web',
                    size: 70,
                    index: 4,
                    depth: 1,
                    radius: 38,
                    onClick: () => {
                        this.setDepth(1, this.sun.substars[4])
                    },
                    substars: [
                        {
                            title: 'WS',
                            size: 12,
                            index: 0,
                            depth: 2,
                            onClick: () => {
                                this.proceed({
                                    title: '🌗',
                                    size: 12,
                                    depth: 2
                                })
                            },
                        },
                    ]   
                }
            ]
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
            if (!this.enabled) return;
            if (!EventManager.self.pointerPressed) return;
            let star = this.currentStar
            const deltaX = this.lastPressedPointer.x - event.clientX
            const forceX = deltaX
            this.lastPressedPointer.x = event.clientX
            this.lastPressedPointer.y = event.clientY
            const depthFactor = (star.info.depth * 0.7 + 1)
            star.applyForce(forceX * depthFactor * 0.5);
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
    }

    private lastPressedPointer = new THREE.Vector3(0, 0, 0)

    run() {
        this.enabled = true
        this.resize()

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
        this.onProceeded?.(info)
    }

    finish(): void {
        this.enabled = false
        this.onFinished?.()
    }
}