import { UIObject } from "@ui/base/UIObject";
import { UIButton, UIImageButton, UIOpaqueBlurButton } from "@ui/base/UIButton";
import * as THREE from "three";
import { Color } from "@data/Color";
import { FileManager } from "../../core/FIleManager";
import { Helper } from "../../core/Helper";

export type starInfo = {
    title: string,
    size: number,
    depth: number
    index?: number,
    radius?: number,
    buttonImageUrl?: string,
    backgroundImageUrl?: string,
    urlUuid?: string,
    substars?: starInfo[]
    onClick?: () => void
}

export class ContentStar extends UIObject {
    substars: ContentStar[] = []
    superstar?: ContentStar
    info: starInfo
    button!: UIButton
    baseAnchor = new THREE.Vector3()

    radius: number = 150
    angle: number = 0.0
    pole: number = 45
    targeted: boolean = false

    private velocity: number = 0.0
    private acceleration: number = 0.0
    private fraction: number = 0.04
    private maxVelocity: number = 10

    constructor(info: starInfo) {
        super()
        this.info = info

        const color = new THREE.Color(1.0, 1.0, 1.0).multiplyScalar((1 / Math.pow(info.depth + 1, 2)))
        const colorHex = Color.helper.getHexNumberFromColor(color)

        if (info.buttonImageUrl != undefined) {
            FileManager.loadTexture(info.buttonImageUrl).then((texture) => {
                this.button = new UIImageButton(texture, {
                    width: info.size,
                    height: info.size,
                    text: info.title,
                    cornerRadius: info.size / 2,
                    onClick: info.onClick
                })
                if (info.depth != 1) {
                    this.button.eventEnabled = false
                } else {
                    this.button.eventEnabled = true
                }
                this.add(this.button)
            }).catch((error) => {
                console.error("Failed to load texture:", error);
                this.button = new UIOpaqueBlurButton({
                    width: info.size,
                    height: info.size,
                    text: info.title,
                    color: colorHex,
                    cornerRadius: info.size / 2,
                    onClick: info.onClick
                })
                if (info.depth != 1) {
                    this.button.eventEnabled = false
                } else {
                    this.button.eventEnabled = true
                }
                this.add(this.button)
            });
        } else {
            this.button = new UIOpaqueBlurButton({
                width: info.size,
                height: info.size,
                text: info.title,
                color: colorHex,
                cornerRadius: info.size / 2,
                onClick: info.onClick
            })
            if (info.depth != 1) {
                this.button.eventEnabled = false
            } else {
                this.button.eventEnabled = true
            }
            this.add(this.button)
        }

        if (!info.radius || !info.substars) return

        this.radius = info.radius
        for (let substarInfo of info.substars) {
            if (substarInfo.index === undefined) continue
            substarInfo.size = info.size * 0.5

            const substar = new ContentStar(substarInfo)
            substar.superstar = this

            let x = Math.cos(substarInfo.index / info.substars.length * Math.PI * 2) * this.radius
            let z = Math.sin(substarInfo.index / info.substars.length * Math.PI * 2) * this.radius

            let v = new THREE.Vector3(x, 0, z)
            v.applyAxisAngle(new THREE.Vector3(1, 0, 0), this.pole * (Math.PI / 180))
            x = v.x
            let y = v.y
            z = v.z

            substar.position.set(x, y, z)
            this.substars.push(substar)
            this.add(substar)
        }
    }

    update(dt: number): void {

        for (let substar of this.substars) {
            let index = this.substars.indexOf(substar)
            let baseAngle = index / this.substars.length * Math.PI * 2
            let angle = this.angle + baseAngle
            let v = new THREE.Vector3(Math.cos(angle) * this.radius, 0, Math.sin(angle) * this.radius)
            // let angleOffset = this.poleX * (Math.PI / 180)
            v.applyAxisAngle(new THREE.Vector3(1, 0, 0), this.pole * (Math.PI / 180))
            substar.position.lerp(new THREE.Vector3(v.x, v.y, v.z), 0.1)
            substar.update(dt)
            substar.applyForce(this.acceleration * 4)
            substar.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        }

        // const scale = 0.5
        // const poleOffsetX = (90 - this.poleX) * scale
        // const poleOffsetY = (90 - this.poleY) * scale
        // this.button.position.lerp(new THREE.Vector3(poleOffsetX, poleOffsetY, 0), 0.1)

        this.velocity += this.acceleration * dt
        this.velocity *= (1 - this.fraction)
        this.velocity = Math.min(this.velocity, this.maxVelocity)
        this.angle += this.velocity * dt
        this.acceleration = 0

        const scaleFactor = Helper.map(this.getWorldPosition(this.position.clone()).z, -100, 100, 0.3, 1)
        this.button.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1)
        this.radius = Helper.lerp(this.radius, this.info.radius! * scaleFactor * 1.7, 0.1)
    }

    applyForce(force: number): void {
        this.acceleration += force
    }
}