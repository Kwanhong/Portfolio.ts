import * as THREE from 'three'; import { UIObject } from './UIObject';
import { UIText } from './UIText';
import { uiBaselineStyle, type TextStyle } from '@ui/styles/TextStyle';
import { Color } from '@data/Color';
import { EventManager } from '../../event/EventManager';
import { Camera } from '../../scene/Camera';
import { Helper } from '../../core/Helper';

interface UIButtonOptions {
    width?: number;
    height?: number;
    text?: string;
    style?: TextStyle;
    color?: number;
    cornerRadius?: number;
    onClick?: () => void;
}

export class UIButton extends UIObject {
    backgroundMesh: THREE.Mesh
    backgroundMeshMaxOpacity: number = 0.8
    text: UIText
    eventEnabled: boolean = true

    onBlur(): void {
        this.backgroundMesh.material = new THREE.MeshBasicMaterial({ color: Color.helper.getHex('button.blur'), transparent: true, opacity: this.backgroundMeshMaxOpacity });
    }

    onHover(): void {
        this.backgroundMesh.material = new THREE.MeshBasicMaterial({ color: Color.helper.getHex('button.hover'), transparent: true, opacity: this.backgroundMeshMaxOpacity });
    }

    onPress(): void {
        this.backgroundMesh.material = new THREE.MeshBasicMaterial({ color: Color.helper.getHex('button.press'), transparent: true, opacity: this.backgroundMeshMaxOpacity });
    }

    private width: number = 100
    private height: number = 50

    constructor({
        width = 100,
        height = 50,
        text = "",
        style = uiBaselineStyle,
        color = Color.helper.getHexNumber('button.blur'),
        cornerRadius = 10,
        onClick
    }: UIButtonOptions = {}) {
        super();
        this.width = width;
        this.height = height;
        this.text = new UIText(text, style, () => {
            const size = { width: width, height: height };
            const bounds = { min: { x: 0, y: 0 }, max: { x: size.width, y: size.height } };
            this.text.position.set(0, 0, 1);
            this.text.setSize(size);
            this.text.setBounds(bounds);
        });
        this.add(this.text);

        const geometry = this.roundedPlaneGeometry(width, height, cornerRadius);
        const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
        this.backgroundMesh = new THREE.Mesh(geometry, material);
        this.add(this.backgroundMesh);

        if (onClick) {
            EventManager.self.addPointerMoveListener((event) => {
                if (EventManager.self.pointerPressed || !this.eventEnabled) return;
                if (this.isInBounds(width, height, event)) {
                    this.onHover();
                } else {
                    this.onBlur();
                }
            });

            EventManager.self.addPointerDownListener((event) => {
                if (!this.eventEnabled) return;
                if (this.isInBounds(width, height, event))
                    this.onPress();
            });

            EventManager.self.addPointerUpListener((event) => {
                if (!this.eventEnabled) return;
                if (this.isInBounds(width, height, event))
                    onClick();
            });
        }
    }

    get size() {
        return  { width: this.width, height: this.height };
    }

    private isInBounds(width: number, height: number, event: PointerEvent): boolean {
        const localPosition = this.worldToLocal(Camera.getMouseWorldPosition(event));
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        return (
            localPosition.x >= -halfWidth && localPosition.x <= halfWidth &&
            localPosition.y >= -halfHeight && localPosition.y <= halfHeight
        )
    }

    setOpacity(opacity: number): void {
        let mappedOpacity = Helper.map(opacity, 0, 1, 0, this.backgroundMeshMaxOpacity);
        (this.backgroundMesh.material as THREE.MeshBasicMaterial).opacity = mappedOpacity;
        (this.text.textMesh.textMesh.material as THREE.MeshBasicMaterial).opacity = mappedOpacity;
    }
}

export class UIOpaqueBlurButton extends UIButton {
    opaqueBackground: THREE.Mesh
    opaqueBackgroundMaxOpacity: number = 0.8
    onBlur(): void {
        this.backgroundMesh.material = new THREE.MeshBasicMaterial({ color: Color.helper.getHex('button.blur'), transparent: true, opacity: this.backgroundMeshMaxOpacity });
    }

    onHover(): void {
        this.backgroundMesh.material = new THREE.MeshBasicMaterial({ color: Color.helper.getHex('button.hover'), transparent: true, opacity: this.backgroundMeshMaxOpacity });
    }

    onPress(): void {
        this.backgroundMesh.material = new THREE.MeshBasicMaterial({ color: Color.helper.getHex('button.press'), transparent: true, opacity: this.backgroundMeshMaxOpacity });
    }

    constructor({
        width = 100,
        height = 50,
        text = "",
        style = uiBaselineStyle,
        color = Color.helper.getHexNumber('button.blur'),
        cornerRadius = 10,
        onClick
    }: UIButtonOptions = {}) {
        super({ width, height, text, style, color, cornerRadius, onClick });
        const geometry = this.roundedPlaneGeometry(width, height, cornerRadius);
        const material = new THREE.MeshPhysicalMaterial({
            transmission: 1.0, // Fully transparent to the background capture
            roughness: 0.3,    // Controls the amount of blur (0 is clear, 1 is very blurred)
            thickness: 1.7,    // Required for roughness to take effect
            ior: 1.5,          // Index of refraction
        })
        material.transparent = true;
        this.backgroundMeshMaxOpacity = 0.3
        this.opaqueBackground = new THREE.Mesh(geometry, material);
        this.add(this.opaqueBackground);
        this.opaqueBackground.position.set(0, 0, -0.1);
    }

    setOpacity(opacity: number): void {
        super.setOpacity(opacity);
        let opacityMapped = Helper.map(opacity, 0, 1, 0, this.opaqueBackgroundMaxOpacity);
        let material = this.opaqueBackground.material as THREE.MeshPhysicalMaterial;
        material.opacity = opacityMapped;
    }
}