import * as THREE from 'three'
import type { Scene } from './Scene'
import { Color } from '@data/Color'
import { UIText } from '@ui/base/UIText'
import { Language } from '@data/Language'
import { Camera } from '../Camera'
import { Time } from '../../core/Time'
import {
    defaultDescriptionStyle,
    defaultHeadlineStyle
} from '@styles/TextStyle'
import { FlowField } from '../../objects/main/FlowField'
import { Agent } from '@objects/main/Agent'
import { EventManager } from '../../event/EventManager'
import { FileManager } from '../../core/FIleManager'
import { Helper } from '../../core/Helper'
import { UIOpaqueBlurButton } from '@ui/base/UIButton'


export class MainScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined

    private _enabled: boolean = false;
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    private head?: THREE.Object3D
    private offsetX: number = 0
    private headlineText: UIText
    private descriptionText: UIText
    private autherText: UIText
    private lastMousePosition: THREE.Vector3 = new THREE.Vector3()

    private animationMixer?: THREE.AnimationMixer
    private clips: THREE.AnimationClip[] = []
    private previousAction?: THREE.AnimationAction
    private blowing: boolean = false

    constructor(scene: THREE.Scene, onFinished: () => void = () => { }) {

        this.mother = scene
        this.mother.add(this.self)
        this.onFinished = onFinished
        this.enabled = false

        const headlineStyle = { ...defaultHeadlineStyle, fontSize: 72, color: Color.helper.getHex('text.primary') }
        const descriptionStyle = { ...defaultDescriptionStyle, color: Color.helper.getHex('text.secondary') }
        const autherStyle = { ...descriptionStyle, fontSize: 13, color: Color.helper.getHex('foreground.primary') }
        const button = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: Language.helper.get('main.button.start'),
            onClick: () => {
                this.finish()
            }
        })
        button.visible = false

        this.autherText = new UIText(Language.helper.get('main.auther'), autherStyle)
        this.descriptionText = new UIText(Language.helper.get('main.description'), descriptionStyle)
        this.headlineText = new UIText(Language.helper.get('main.headline'), headlineStyle, (_, size) => {
            this.headlineText.setSize(size)
            this.descriptionText.setSize(size)
            this.autherText.setSize(size)
            let opacity = 0
            let fadeInDuration = 1
            button.visible = true
            Time.coroutineSec(fadeInDuration, () => {
                opacity += Time.self!.deltaTime / fadeInDuration
                this.headlineText.setOpacity(opacity)
                this.descriptionText.setOpacity(opacity)
                this.autherText.setOpacity(opacity)
                button.setOpacity(opacity)
            }, () => {
                button.eventEnabled = true
            })
        });

        this.headlineText.position.set(0, 0, 100)
        this.descriptionText.position.set(5, -60, 100)
        this.autherText.position.set(5, -87, 100)

        button.position.set(0, -150, 100)
        button.setOpacity(0)
        button.eventEnabled = false

        this.autherText.setOpacity(0)
        this.descriptionText.setOpacity(0)
        this.headlineText.setOpacity(0)

        this.self.add(this.headlineText)
        this.self.add(this.descriptionText)
        this.self.add(this.autherText)
        this.self.add(button)

        this.flow = new FlowField(30, Camera.size.width, Camera.size.height)

        EventManager.self.addPointerDownListener((event: PointerEvent) => {
            this.lastMousePosition = Camera.getMouseWorldPosition(event)
            this.playAnimation('blow', THREE.LoopOnce)
            let inhale = 0.7
            this.pointerDuration = 0
            Time.coroutineSec(inhale, () => { }, () => {
                if (!EventManager.self.pointerPressed) return;

                this.scatterAll(Camera.getMouseWorldPosition(event))
                this.blowing = true

                Time.coroutine(() => {
                    return EventManager.self.pointerPressed == false
                }, () => {
                    this.pointerDuration += Time.self?.deltaTime ?? 0
                    let noise = Time.getNoise(5)
                    let angle = Math.PI / 8
                    let rotation = Helper.map(noise, 0, 1, -angle, angle) * 0.1
                    this.head?.rotation.set(this.head.rotation.x, this.head.rotation.y, rotation)
                }, () => {
                    this.pointerDuration = 0
                })
            })
        })

        EventManager.self.addPointerMoveListener((event: PointerEvent) => {
            this.lastMousePosition = Camera.getMouseWorldPosition(event)
            if (!EventManager.self.pointerPressed) {
                this.blowing = false
                this.pointerDuration = 0
            }
        })

        EventManager.self.addPointerUpListener(() => {
            if (this.pointerDuration < 0.7) {
                this.blowing = false
                this.pointerDuration = 0
                Time.coroutineSec(0.7, () => { }, () => {
                    this.playAnimation('idle')
                })
                return
            }
            this.pointerDuration = 0
            this.blowing = false
            this.playAnimation('idle')
        })

        let donwload = FileManager.loadGLB('resources/meshes/face.glb')
        donwload.then((data) => {
            let object = data.scene
            object.scale.set(0.1, 0.1, 0.1)
            object.position.set(0, 90, -90)
            this.self.add(object)
            this.head = object
            this.clips = data.animations
            this.animationMixer = new THREE.AnimationMixer(object);
            this.playAnimation('idle')

            let scale = 0.1
            const maxScale = 50
            Time.coroutine(() => {
                return scale >= maxScale
            }, () => {
                scale += (maxScale - scale) * 0.1
                this.head?.scale.setScalar(scale);
            }, () => {
                this.head?.scale.setScalar(50);
            })
        })

        this.flow.showIndicators(this)
        for (let i = 0; i < 300; i++) {
            let agent = new Agent()
            agent.position.set(
                (Math.random() - 0.5) * Camera.size.width,
                (Math.random() - 0.5) * Camera.size.height, 0
            )
            this.self.add(agent)
            this.agents.push(agent)
        }
    }

    private pointerDuration: number = 0

    playAnimation(name: string, loop: THREE.AnimationActionLoopStyles = THREE.LoopRepeat): void {
        let clip = this.clips.find((clip) => { return clip.name == name })
        if (clip) {
            let prevAction = this.previousAction
            let nextAction = this.animationMixer?.clipAction(clip)

            if (nextAction && prevAction) {
                if (prevAction === nextAction) return
                nextAction.reset()
                nextAction.crossFadeFrom(prevAction, 0.5, true)
                nextAction.play()
                nextAction.setLoop(loop, Infinity)
                this.previousAction = nextAction
            } else if (nextAction) {
                nextAction.play()
                this.previousAction = nextAction
            }
        }
    }

    scatterAll(origin: THREE.Vector3): void {
        for (const agent of this.agents) {
            agent.scatter(origin)
        }
    }

    private agents: Array<Agent> = []
    private flow: FlowField

    run() {
        this.enabled = true
    }

    update(dt: number): void {
        if (!this.enabled) return

        let radius = 17
        let headPos = this.lastMousePosition.clone().normalize().multiplyScalar(radius).add(new THREE.Vector3(0, 90, -50))
        this.head?.position.lerp(headPos, 0.1)
        let originalZ = this.head?.rotation.z ?? 0
        let target = new THREE.Vector3(this.lastMousePosition.x, this.lastMousePosition.y, 500)
        let currentTarget = this.head?.userData.currentTarget as THREE.Vector3 || new THREE.Vector3();
        currentTarget.lerp(target, 0.1);

        if (this.head) {
            this.head.userData.currentTarget = currentTarget
            this.head.lookAt(currentTarget)
            this.head.rotation.z = originalZ
        }

        for (const agent of this.agents) {

            agent.update(dt)
            agent.flock(this.agents)
            agent.follow(this.flow)

            if (agent.position.x < Camera.bounds.left - 20)
                agent.position.x = Camera.bounds.right + 20
            if (agent.position.x > Camera.bounds.right + 20)
                agent.position.x = Camera.bounds.left - 20

            if (agent.position.y < Camera.bounds.bottom - 20)
                agent.position.y = Camera.bounds.top + 20
            if (agent.position.y > Camera.bounds.top + 20)
                agent.position.y = Camera.bounds.bottom - 20

            if (this.blowing) {
                agent.scatter(this.lastMousePosition)
            }
        }
        this.animationMixer?.update(dt)
    }

    refresh(): void {
        // Code to refresh or update the scene
        if (!this.enabled) return

    }

    finish(): void {
        // Code to execute when the scene is finished
        this.enabled = false
        this.onFinished?.()
    }

    resize(): void {
    }
}