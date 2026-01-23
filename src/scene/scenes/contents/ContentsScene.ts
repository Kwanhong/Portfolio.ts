import * as THREE from 'three'
import type { Scene } from '../Scene'
import { UIOpaqueBlurButton } from '@ui/base/UIButton'
import { Camera } from '../../Camera'
import { ContentStar } from '@objects/contents/ContentStar'
import { EventManager } from '../../../event/EventManager'
import { Helper } from '../../../core/Helper'
import { SceneObject } from '@objects/SceneObject'
import { BackgroundField } from '@objects/contents/BackgroundField'
import { Language } from '@data/Language'
import { defaultBaselineStyle } from '@ui/styles/TextStyle'
import { Time } from '../../../core/Time'
import { Data, type contentsInfo, type starInfo } from '@data/Info'

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

    private backgroundField: BackgroundField
    private returnButton: UIOpaqueBlurButton
    private finishButton: UIOpaqueBlurButton

    private sun: ContentStar
    private currentStar: ContentStar
    private currentDepth: number = 0

    private lastPressedPointer: PointerEvent = new PointerEvent('pointerdown')
    private grabbedStar?: ContentStar

    constructor(scene: THREE.Scene, onReturned: () => void = () => { }, onProceeded: (infos?: contentsInfo) => void = () => { }, onFinished: () => void = () => { }) {

        this.mother = scene;
        this.mother.add(this.self);
        this.onFinished = onFinished;
        this.onReturned = onReturned;
        this.onProceeded = onProceeded;
        this.enabled = false;

        // Construct Base UIs
        this.backgroundField = new BackgroundField(Camera.size, 51)
        this.backgroundField.position.set(-12, 24, -250)
        this.self.add(this.backgroundField)

        const solarSystem = new SceneObject()
        solarSystem.position.set(0, 20, 0)
        this.self.add(solarSystem)

        const info = Data.starInfo
        info.onClick = () => {
            Time.coroutineSec(0.2, () => {
                this.currentStar.applyForce(30);
            }, () => { });
        }
        for (let substar of info?.substars ?? []) {
            substar.onClick = () => {
                if (this.currentStar == this.sun.substars[substar.index!]) {
                    Time.coroutineSec(0.3, () => {
                        this.currentStar.applyForce(60);
                    }, () => { });
                } else {
                    this.setDepth(1, this.sun.substars[substar.index!])
                }
            }
            for (let subsubstar of substar.substars!) {
                subsubstar.onClick = () => { this.proceed(subsubstar) }
            }
        }

        this.sun = new ContentStar(info)
        solarSystem.add(this.sun)
        this.currentStar = this.sun
        this.currentStar.targeted = true

        this.returnButton = new UIOpaqueBlurButton({
            width: 80,
            height: 36,
            cornerRadius: 18,
            style: { ...defaultBaselineStyle, fontSize: 11, anchorX: 'center', textAlign: 'center' },
            text: Language.helper.get('contents.button.back'),
            onClick: this.onBackButtonClicked.bind(this)
        })

        this.finishButton = new UIOpaqueBlurButton({
            width: 80,
            height: 36,
            cornerRadius: 18,
            style: { ...defaultBaselineStyle, fontSize: 11, anchorX: 'center', textAlign: 'center' },
            text: Language.helper.get('contents.button.finish'),
            onClick: this.finish.bind(this)
        })

        this.self.add(this.returnButton)
        this.self.add(this.finishButton)

        // Event Listeners
        EventManager.self.addPointerMoveListener(this.onPointerMove.bind(this));
        EventManager.self.addPointerDownListener(this.onPointerDown.bind(this));
    }

    onBackButtonClicked(): void {

        if (!this.enabled) return;

        if (this.currentDepth > 0) {
            this.setDepth(this.currentDepth - 1, this.currentStar.superstar!)
            this.currentStar.applyForce(400);
        } else {
            this.return()
        }
    }

    onPointerDown(event: PointerEvent): void {

        this.lastPressedPointer = event;

        if (!this.enabled) return;

        let nearestStar: ContentStar | null = null;
        let nearestDistance = Infinity;
        this.currentStar.substars.forEach((s) => {
            const screenPos = Camera.getMouseWorldPosition(event);
            const distance = s.position.distanceTo(screenPos);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestStar = s;
            }
        });

        this.grabbedStar = nearestStar ?? undefined;
    }

    onPointerMove(event: PointerEvent): void {
        let deltaX = event.clientX - this.lastPressedPointer.clientX;
        this.currentStar.applyForce(-deltaX * 0.05);
        this.lastPressedPointer = event;
    }

    run() {
        this.enabled = true
        this.resize()

        this.backgroundField.setDepth(this.currentDepth);

        let force = 50
        Time.coroutineSec(0.75, () => {
            this.sun.applyForce(force);
            force *= 0.99
        }, () => { });
    }

    update(dt: number): void {

        if (!this.enabled) return;

        this.backgroundField.update(dt);

        const star = this.currentStar
        this.updateStarLayout(star)
        this.updateSuperstarLayout(star)
        this.updateSubstarLayout(star)
        this.updateStarBehavior(star)
        star.update(dt)

        this.finishButton.update(dt);
        this.returnButton.update(dt);

        if (!EventManager.self.pointerPressed) return;

        if (this.currentStar.button.isHovered) return;
        const grabbed = this.grabbedStar;
        if (!grabbed || grabbed.info.index === undefined) return;

        const anchoredAngle = (grabbed.info.index) * (Math.PI * 2 / this.currentStar.substars.length) + (Math.PI / 2);
        const pointerPos = Camera.getMouseWorldPosition(this.lastPressedPointer);
        const pointerAngle = Math.atan2(pointerPos.y, pointerPos.x);

        this.currentStar.angle = -pointerAngle - anchoredAngle
    }

    updateStarLayout(star: ContentStar): void {

        let radius = 10
        let pointer = Camera.getMouseWorldPosition(this.lastPressedPointer)
        let starPos = pointer.clone().normalize().multiplyScalar(radius).add(star.baseAnchor)
        star.position.lerp(starPos, 0.1)
    }

    updateSuperstarLayout(star: ContentStar): void {

        // const superstarScaleFactor = 3
        star.superstar?.position.lerp(star.baseAnchor.clone().multiplyScalar(-1), 0.1)

        // const scale = new THREE.Vector3(1, 1, 1).multiplyScalar(superstarScaleFactor)
        // star.superstar?.button.scale.lerp(scale, 0.2)
        // star.button.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2)
    }

    updateSubstarLayout(star: ContentStar): void {

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
    }

    updateStarBehavior(star: ContentStar): void {

        let selectedNone = true
        star.substars.forEach((s) => {
            if (s.button.status != 'blur') {
                selectedNone = false
                return
            }
        });

        if (EventManager.self.pointerPressed && selectedNone) {
            this.setStarBehaviorFocused(star)
        } else {
            this.setStarBehaviorUnfocused(star)
        }
    }

    setStarBehaviorFocused(star: ContentStar): void {

        let radius = (star.info.radius ?? 100) * 0.75
        if (this.currentDepth === 1) {
            radius = (star.info.radius ?? 100) * 2.2
        }

        star.radius = Helper.lerp(star.radius, radius, 0.2)
        star.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9).multiplyScalar(star.info.depth * 0.7 + 1), 0.2)
        star.pole = Helper.lerp(star.pole, 90, 0.2)

        for (let substar of star.substars) {
            substar.pole = Helper.lerp(substar.pole, 90, 0.2)
        }
    }

    setStarBehaviorUnfocused(star: ContentStar): void {

        let radius = star.info.radius ?? 100
        if (this.currentDepth === 1) {
            radius = (star.info.radius ?? 100) * 2.5
        }

        star.radius = Helper.lerp(star.radius, radius, 0.2)
        star.pole = Helper.lerp(star.pole, 45, 0.2)
        star.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(star.info.depth * 0.7 + 1), 0.2)

        for (let substar of star.substars) {
            substar.pole = Helper.lerp(substar.pole, 45, 0.2)
        }
    }

    setDepth(depth: number, star: ContentStar) {

        this.currentStar.radius = this.currentStar.info.radius ?? 100

        if (depth > this.currentDepth) {
            const superstarScaleFactor = 3
            const width = Camera.size.width / 2 + star.info.size * superstarScaleFactor
            const height = Camera.size.height / 2 + star.info.size * superstarScaleFactor
            star.baseAnchor = new THREE.Vector3(width, height)
        }

        this.currentStar.targeted = false
        star.targeted = true

        this.currentDepth = depth
        this.currentStar = star

        this.currentStar.applyForce(50);
        this.backgroundField.setDepth(depth);
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

    refresh(): void { }
}
