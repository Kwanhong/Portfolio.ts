import * as THREE from 'three'
import type { Scene } from './Scene'
import { UIOpaqueBlurButton } from '@ui/base/UIButton'
import { Camera } from '../Camera'
import { ContentStar, type starInfo } from '@objects/contents/ContentStar'
import { EventManager } from '../../event/EventManager'
import { Helper } from '../../core/Helper'
import { SceneObject } from '@objects/SceneObject'
import { FileManager } from '../../core/FIleManager'
import { Time } from '../../core/Time'
import { Color } from '@data/Color'

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

    private backgroundMeshes: THREE.Mesh[] = [];
    private backgroundMeshCount: number = 3; // 기본값을 2로 설정
    private currentBackgroundIndex: number = 0;
    private transitionDimmer: THREE.Mesh;

    constructor(scene: THREE.Scene, onReturned: () => void = () => { }, onProceeded: (info: starInfo) => void = () => { }, onFinished: () => void = () => { }) {
        this.mother = scene;
        this.mother.add(this.self);
        this.onFinished = onFinished;
        this.onReturned = onReturned;
        this.onProceeded = onProceeded;
        this.enabled = false;

        const info = {
            title: 'PORTFOLiO',
            size: 100,
            radius: 150,
            depth: 0,
            backgroundImageUrl: 'https:/images.pexels.com/photos/110854/pexels-photo-110854.jpeg',
            substars: [
                {
                    title: 'UNITY',
                    size: 70,
                    index: 0,
                    radius: 38,
                    depth: 1,
                    backgroundImageUrl: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg',
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
                    backgroundImageUrl: 'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg',
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
                    backgroundImageUrl: 'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg',
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
                    backgroundImageUrl: 'https://images.pexels.com/photos/5077042/pexels-photo-5077042.jpeg',
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

        const imageUrl = this.currentStar.info.backgroundImageUrl
        const geometry = new THREE.PlaneGeometry(1, 1); // 임시 초기화

        for (let i = 0; i < this.backgroundMeshCount; i++) {
            const material = new THREE.MeshBasicMaterial({ transparent: false });
            const mesh = new THREE.Mesh(geometry.clone(), material);
            mesh.position.set(0, 0, -200 - i); // Z축으로 쌓이도록 설정
            mesh.visible = i === 0; // 첫 번째 메시만 보이도록 설정
            this.backgroundMeshes.push(mesh);
            this.self.add(mesh);
        }

        const colorHex = Color.helper.getHexNumber('background.primary');
        const dimmerMaterial = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0 })
        this.transitionDimmer = new THREE.Mesh(geometry.clone(), dimmerMaterial);
        this.transitionDimmer.position.set(0, 0, -200);
        this.self.add(this.transitionDimmer);

        if (imageUrl) {
            this.setBackgroundTexture(imageUrl);
        }
    }
    private setBackgroundTexture(url: string): void {
        const download = FileManager.loadTexture(url);
        const duration = 0.5;

        this.dim(duration, 1, () => {
            // Find the next available background mesh
            let nextIndex = (this.currentBackgroundIndex + 1) % this.backgroundMeshCount;
            let found = false;

            for (let i = 0; i < this.backgroundMeshCount; i++) {
                const texture = (this.backgroundMeshes[i].material as THREE.MeshBasicMaterial).map as THREE.Texture<HTMLImageElement>;
                const uuid = texture?.uuid;

                if (uuid != null && uuid === this.currentStar.info.urlUuid) {
                    nextIndex = i;
                    found = true;
                    break;
                }
            }
            let currentIndex = this.currentBackgroundIndex;
            for (let i = 0; i < this.backgroundMeshCount; i++) {
                if (this.backgroundMeshes[i].visible) {
                    currentIndex = i;
                    break;
                }
            }

            const currentMesh = this.backgroundMeshes[currentIndex];
            const nextMesh = this.backgroundMeshes[nextIndex];
            const bgMaterial = nextMesh.material as THREE.MeshBasicMaterial;

            // If the texture is not found or needs to be updated
            if (!found || !bgMaterial.map || bgMaterial.map.uuid !== this.currentStar.info.urlUuid) {
                download.then((texture) => {
                    bgMaterial.map?.dispose();
                    bgMaterial.map = texture;
                    this.currentStar.info.urlUuid = texture.uuid;
                    this.fitImageToWindow(texture);

                    // Update visibility
                    currentMesh.visible = false;
                    nextMesh.visible = true;
                    this.currentBackgroundIndex = nextIndex;

                    this.dim(duration, -1);
                });
            } else {
                // No need to update texture, just switch visibility
                currentMesh.visible = false;
                nextMesh.visible = true;
                // this.currentBackgroundIndex = nextIndex;

                this.dim(duration, -1);
            }
        });
    }

    private dim(duration = 0.5, inOut = 1, complete: () => void = (): void => { }): void {

        const material = this.transitionDimmer.material as THREE.MeshBasicMaterial
        Time.coroutineSec(duration, (dt) => {
            material.opacity += (dt / duration) * inOut
        }, () => {
            material.opacity = inOut > 0 ? 1 : 0
            complete()
        })
    }

    private fitImageToWindow(texture: THREE.Texture<HTMLImageElement>): void {
        if (texture && texture.image && texture.image.width && texture.image.height) {
            const imageAspect = texture.image.width / texture.image.height;
            const cameraAspect = Camera.size.width / Camera.size.height;

            let planeWidth, planeHeight;

            if (imageAspect > cameraAspect) {
                planeHeight = Camera.size.height;
                planeWidth = planeHeight * imageAspect;
            } else {
                planeWidth = Camera.size.width;
                planeHeight = planeWidth / imageAspect;
            }

            this.backgroundMeshes.forEach(mesh => {
                mesh.geometry.dispose(); // Dispose old geometry
                mesh.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
            });

            this.transitionDimmer.geometry.dispose(); // Dispose old geometry
            this.transitionDimmer.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
        } else {
            console.warn("Texture image is not available or invalid.");
        }
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

        if (star.info.backgroundImageUrl) {
            this.setBackgroundTexture(star.info.backgroundImageUrl);
        }
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

        for (let mesh of this.backgroundMeshes) {
            const texture = (mesh.material as THREE.MeshBasicMaterial).map as THREE.Texture<HTMLImageElement>;
            this.fitImageToWindow(texture);
        }
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