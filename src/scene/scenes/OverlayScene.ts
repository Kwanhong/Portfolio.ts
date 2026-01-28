import * as THREE from 'three'
import type { Scene } from './Scene';
import { type overlayInfo } from '@data/Info';
import { UIPagingView } from '@ui/components/UIPagingView';
import { UIText } from '@ui/base/UIText';
import { defaultDescriptionStyle, defaultHeadlineStyle, uiBaselineStyle, type TextStyle } from '@ui/styles/TextStyle';
import { UIButton, UIOpaqueBlurButton } from '@ui/base/UIButton';
import { Language } from '@data/Language';
import { Time } from '../../core/Time';
import { UIView } from '@ui/base/UIView';
import { Camera } from '../Camera';

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

    private settingsView: UIView;

    private size: { width: number, height: number } = { width: 460, height: 400 }
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    constructor(mother: THREE.Scene, onFinished?: () => void) {
        this.mother = mother
        this.mother.add(this.self)
        this.self.position.set(0, 0, 900)
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

        this.settingsView = new UIView({ x: 0, y: Camera.size.height / 2, width: Camera.size.width, height: Camera.size.height }, 0, true);
        this.self.add(this.settingsView);
        this.settingsView.translateZ(100)

        const titleStyle: TextStyle = { ...defaultHeadlineStyle, textAlign: 'left', anchorX: 'left', fontSize: 21 };
        const titleEn = new UIText(Language.helper.get('setting.selection.title', '', 'en'), titleStyle, (_, tSize) => {
            titleEn.setSize({ width: tSize.width, height: tSize.height });
            titleEn.position.set(0, 140, 1);
        });
        this.settingsView.add(titleEn);

        const titleKr = new UIText(Language.helper.get('setting.selection.title', '', 'kr'), titleStyle, (_, tSize) => {
            titleKr.setSize({ width: tSize.width, height: tSize.height });
            titleKr.position.set(0, 90, 1);
        });
        this.settingsView.add(titleKr);

        this.closeButton.eventEnabled = false;

        const languageButtonEn = new UIOpaqueBlurButton({
            text: Language.helper.get('setting.selection.language', '', 'en'),
            width: 80,
            height: 40,
            cornerRadius: 20,
            onClick: () => {
                Language.helper.forceSet('en');
                Time.coroutineSec(0.3, () => { }, () => {
                    this.settingsView.visible = false;
                    this.closeButton.eventEnabled = true;
                    this.pagingView.eventEnabled = true;
                });
            }
        });

        languageButtonEn.position.set(0, 0, 1);

        const languageButtonKr = new UIOpaqueBlurButton({
            text: Language.helper.get('setting.selection.language', '', 'kr'),
            width: 80,
            height: 40,
            cornerRadius: 20,
            onClick: () => {
                Language.helper.forceSet('kr');
                Time.coroutineSec(0.3, () => { }, () => {
                    this.settingsView.visible = false;
                    this.closeButton.eventEnabled = true;
                    this.pagingView.eventEnabled = true;
                });
            }
        });

        languageButtonKr.position.set(0, -60, 1);

        this.settingsView.add(languageButtonKr);
        this.settingsView.add(languageButtonEn);

        languageButtonEn.scale.set(0, 0, 0);
        languageButtonKr.scale.set(0, 0, 0);

        const textDelay = 1.5;
        const textAnimationDuration = 0.75;
        let textElapsedTime = 0;
        (titleEn.textMesh.textMesh.material as THREE.MeshBasicMaterial).opacity = 0;
        (titleKr.textMesh.textMesh.material as THREE.MeshBasicMaterial).opacity = 0;
        Time.coroutineSec(textDelay, () => { }, () => {

            this.pagingView.eventEnabled = false;
            Time.coroutineSec(textAnimationDuration, () => {
                textElapsedTime += Time.self!.deltaTime;
                const t = Math.min(textElapsedTime / textAnimationDuration, 1);
                const opacity = Math.sin((t * Math.PI) / 2);
                (titleEn.textMesh.textMesh.material as THREE.MeshBasicMaterial).opacity = opacity;
                (titleKr.textMesh.textMesh.material as THREE.MeshBasicMaterial).opacity = opacity;
            }, () => {
                (titleEn.textMesh.textMesh.material as THREE.MeshBasicMaterial).opacity = 1;
                (titleKr.textMesh.textMesh.material as THREE.MeshBasicMaterial).opacity = 1;
            });
        });

        const buttonDelay = 2;
        const buttonAnimationDuration = 0.2;
        let buttonElapsedTime = 0;
        Time.coroutineSec(buttonDelay, () => { }, () => {
            buttonElapsedTime = 0;
            Time.coroutineSec(buttonAnimationDuration, () => {
                buttonElapsedTime += Time.self!.deltaTime;
                const t = Math.min(buttonElapsedTime / buttonAnimationDuration, 1);
                const scale = Math.sin((t * Math.PI) / 2); // Sin 보간
                languageButtonEn.scale.set(scale, scale, scale);
                languageButtonKr.scale.set(scale, scale, scale);
            }, () => {
                languageButtonEn.scale.set(1, 1, 1);
                languageButtonKr.scale.set(1, 1, 1);
            });
        });
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

        this.pagingView = new UIPagingView(info.pages, { x: 0, y: size.height / 2, width: size.width, height: size.height }, () => { return this.closeButton.isHovered });
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
            this.message!.textKey = info.message
            this.pagingView.add(this.message);
        });
        this.title.textKey = info.title
        this.pagingView.add(this.title);

        const helpTextStyle: TextStyle = { ...defaultDescriptionStyle, fontSize: 12, textAlign: 'left', anchorX: 'left', anchorY: 'bottom' };
        const helpText = new UIText(Language.helper.get('overlay.main.help'), helpTextStyle, (_, hSize) => {
            helpText.setSize({ width: hSize.width, height: hSize.height });
            helpText.position.set(-size.width / 2 + 20 + hSize.width / 2, -size.height / 2 + hSize.height + 20, 1);
        });
        helpText.textKey = 'overlay.main.help'
        this.pagingView.add(helpText);

        this.closeButton.scale.set(0, 0, 0);
        this.pagingView.scale.set(0, 0, 0);

        // 확대 애니메이션
        const delay = info.index === 0 ? 2.5 : 1;
        const animationDuration = 0.3; // 애니메이션 지속 시간 (초)
        let elapsedTime = 0;

        Time.coroutineSec(delay, () => { }, () => {
            Time.coroutineSec(animationDuration, () => {
                elapsedTime += Time.self!.deltaTime;
                const t = Math.min(elapsedTime / animationDuration, 1);
                const scale = Math.sin((t * Math.PI) / 2); // Sin 보간
                this.pagingView.scale.set(scale, scale, scale);
            }, () => {
                this.pagingView.scale.set(1, 1, 1);
                let elapsedTime = 0;
                Time.coroutineSec(animationDuration, () => {
                    elapsedTime += Time.self!.deltaTime;
                    const t = Math.min(elapsedTime / animationDuration, 1);
                    const scale = Math.sin((t * Math.PI) / 2); // Sin 보간
                    this.closeButton.scale.set(scale, scale, scale);
                }, () => {
                    this.closeButton.scale.set(1, 1, 1);
                })
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

        // 축소 애니메이션
        const animationDuration = 0.2; // 애니메이션 지속 시간 (초)
        let elapsedTime = 0;

        Time.coroutineSec(animationDuration, () => {
            elapsedTime += Time.self!.deltaTime;
            const t = Math.min(elapsedTime / animationDuration, 1);
            const scale = Math.cos((t * Math.PI) / 2); // Sin 보간
            this.closeButton.scale.set(scale, scale, scale);
        }, () => {
            this.closeButton.scale.set(0, 0, 0);

            let elapsedTime = 0;
            Time.coroutineSec(animationDuration, () => {
                elapsedTime += Time.self!.deltaTime;
                const t = Math.min(elapsedTime / animationDuration, 1);
                const scale = Math.cos((t * Math.PI) / 2); // Sin 보간
                this.pagingView.scale.set(scale, scale, scale);
            }, () => {
                this.pagingView.scale.set(0, 0, 0)

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
            });
        })
    }
}