import * as THREE from 'three'
import type { Scene } from './Scene'
import { Color } from '@data/Color'
import { UIText } from '@ui/base/UIText'
import { Language } from '@data/Language'
import { 
    defaultDescriptionStyle, 
    defaultHeadlineStyle 
} from '@styles/TextStyle'


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

    private offsetX: number = 0
    private headlineText: UIText
    private descriptionText: UIText
    private autherText: UIText

    constructor(scene: THREE.Scene, onFinished: ()=>void = ()=>{}) {

        this.mother = scene
        this.mother.add(this.self)
        this.onFinished = onFinished
        this.enabled = false

        const headlineStyle = { ...defaultHeadlineStyle, fontSize: 72, color: Color.helper.getHex('text.primary')}
        const descriptionStyle = { ...defaultDescriptionStyle, color: Color.helper.getHex('text.secondary') }
        const autherStyle = {...descriptionStyle, fontSize: 13, color: Color.helper.getHex('foreground.primary')}

        this.autherText = new UIText(Language.helper.get('main.auther'), autherStyle)
        this.descriptionText = new UIText(Language.helper.get('main.description'), descriptionStyle)
        this.headlineText = new UIText(Language.helper.get('main.headline'), headlineStyle, (_, size) => {
            this.offsetX = -size.width / 2
            this.headlineText.position.set(this.offsetX , 60, 0)
            this.descriptionText.position.set(this.offsetX + 5, 0, 0)
            this.autherText.position.set(this.offsetX + 5, -27, 0)
        })

        this.self.add(this.headlineText)
        this.self.add(this.descriptionText)
        this.self.add(this.autherText)
    }

    run() {
        this.enabled = true
    }

    update(_: number): void {
        // Update logic for MainScene if needed
        if (!this.enabled) return

    }

    refresh(): void {
        // Code to refresh or update the scene
        if (!this.enabled) return

        this.headlineText.position.set(this.offsetX , 60, 0)
        this.descriptionText.position.set(this.offsetX + 5, 0, 0)
        this.autherText.position.set(this.offsetX + 5, -27, 0)
    }

    finish(): void {
        // Code to execute when the scene is finished
        this.enabled = false
        this.onFinished?.()
    }
}