import * as THREE from 'three'
import type { Scene } from './Scene';
import { type overlayInfo } from '@data/Info';
import { UIPagingView } from '@ui/components/UIPagingView';
import { UIText } from '@ui/base/UIText';
import { defaultDescriptionStyle, defaultHeadlineStyle, type TextStyle } from '@ui/styles/TextStyle';
import { UIButton, UIOpaqueBlurButton } from '@ui/base/UIButton';
import { Language } from '@data/Language';
import { Time } from '../../core/Time';

export class OverlayScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined

    private _enabled: boolean = false;

    private title?: UIText;
    private message?: UIText;
    alreadyDisplayed = [false, false, false]
    private pagingView!: UIPagingView;
    private closeButton!: UIButton;

    private size: { width: number, height: number } = { width: 460, height: 400 }
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    constructor(mother: THREE.Scene, onFinished?: () => void) {
        this.mother = mother
        this.mother.add(this.self)
        this.self.position.set(0, 0, 1000)
        this.enabled = false

        // 닫기 버튼
        const closeButton = new UIOpaqueBlurButton({
            text: '×',
            width: 30,
            height: 30,
            cornerRadius: 15,
            onClick: () => {
                this.finish();
            }
        });
        this.closeButton = closeButton

        const padding = 20
        closeButton.position.set(this.size.width / 2 - padding - 15, this.size.height / 2 - padding - 15 + 40, 1);
        this.self.add(closeButton);

        this.onFinished = onFinished;
    }

    setOverlay(info: overlayInfo) {
        if (this.title) {
            this.self.remove(this.title);
            this.title = undefined;
        }
        if (this.message) {
            this.self.remove(this.message);
            this.message = undefined;
        }
        if (this.pagingView) {
            this.self.remove(this.pagingView);
        }

        if (this.alreadyDisplayed[info.index]) {
            this.finish()
            return
        }

        this.alreadyDisplayed[info.index] = true
        const size = this.size

        this.pagingView = new UIPagingView(info.pages, { x: 0, y: size.height / 2, width: size.width, height: size.height });
        this.self.add(this.pagingView);
        this.pagingView.position.set(0, 40, 0.1);

        const headlineStyle: TextStyle = { ...defaultHeadlineStyle, textAlign: 'left', anchorX: 'left' };
        this.title = new UIText(Language.helper.get('use.string.key', info.title), headlineStyle, (_, tSize) => {
            this.title!.setSize({ width: tSize.width, height: tSize.height });
            this.title!.position.set(-size.width / 2 + tSize.width / 2 + 20, size.height / 2 - tSize.height / 2 - 20, 1);

            const descriptionStyle: TextStyle = { ...defaultDescriptionStyle, textAlign: 'left', anchorX: 'left' };
            this.message = new UIText(Language.helper.get('use.string.key', info.message), descriptionStyle, (_, dSize) => {
                this.message!.setSize({ width: size.width - 40, height: dSize.height });
                this.message!.position.set(5, size.height / 2 - tSize.height - dSize.height / 2 - 20, 1);
            });
            this.pagingView.add(this.message);
        });
        this.pagingView.add(this.title);

        this.pagingView.scale.set(0, 0, 0);
        this.closeButton.scale.set(0, 0, 0);

        // 확대 애니메이션
        const delay = info.index === 0 ? 2 : 1;
        const animationDuration = 0.3; // 애니메이션 지속 시간 (초)
        let elapsedTime = 0;

        Time.coroutineSec(delay, () => { }, () => {
            Time.coroutineSec(animationDuration, () => {
                elapsedTime += Time.self!.deltaTime;
                const t = Math.min(elapsedTime / animationDuration, 1);
                const scale = Math.sin((t * Math.PI) / 2); // Sin 보간
                this.pagingView.scale.set(scale, scale, scale);
                this.closeButton.scale.set(scale, scale, scale);
            }, () => {
                this.pagingView.scale.set(1, 1, 1);
                this.closeButton.scale.set(1, 1, 1);
            });
        });
    }

    run() {
        this.enabled = true
    }

    refresh(): void {
    }

    update(_: number): void {
    }

    resize(): void {

    }

    finish(): void {
        if (this.title) {
            this.self.remove(this.title);
            this.title = undefined;
        }
        if (this.message) {
            this.self.remove(this.message);
            this.message = undefined;
        }
        if (this.pagingView) {
            this.self.remove(this.pagingView);
        }

        this.enabled = false
        this.onFinished?.()
    }
}