import * as THREE from 'three'; import { UIObject } from './UIObject';
import { UIText } from './UIText';
import { uiBaselineStyle, type TextStyle } from '@ui/styles/TextStyle';
import { Color } from '@data/Color';
import { EventManager } from '../../event/EventManager';
import { Camera } from '../../scene/Camera';
import { Helper } from '../../core/Helper';
import { Time } from '../../core/Time';
import { UIImageView } from './UIImageView';

interface UIButtonOptions {
    width?: number;
    height?: number;
    text?: string;
    shape?: buttonShape;
    style?: TextStyle;
    color?: number;
    cornerRadius?: number;
    onClick?: () => void;
}

export type buttonStatus = 'hover' | 'press' | 'blur'
export type buttonShape = 'rectangle' | 'diamond'

export class UIButton extends UIObject {

    roundCornerRadius: number = 15;
    private static doubleClickThreshold: number = 100; // milliseconds

    backgroundMesh: THREE.Mesh
    backgroundMeshMaxOpacity: number = 0.8
    text: UIText
    status: buttonStatus = 'hover'
    shape: buttonShape = 'rectangle'

    private color: THREE.Color = new THREE.Color(1, 1, 1);
    private _eventEnabled: boolean = true;
    set eventEnabled(value: boolean) {
        if (!value) {
            this.onBlur();
        }
        this._eventEnabled = value;
    }
    get eventEnabled(): boolean {
        return this._eventEnabled;
    }

    update(dt: number): void {
        super.update(dt);
    }

    private onClick?: () => void

    setSize(size: { width: number, height: number }): void {
        this.size = size;
        this.bounds = { max: { x: size.width / 2, y: size.height / 2 }, min: { x: -size.width / 2, y: -size.height / 2 } }
        this.text.position.set(size.width / 2, 0, 1);
        this.text.setSize(size);
        this.backgroundMesh.geometry.dispose();

        if (this.shape === 'diamond') {
            this.backgroundMesh.geometry = this.roundedDiamondGeometry(size.width, size.height, this.roundCornerRadius);
        } else {
            this.backgroundMesh.geometry = this.roundedPlaneGeometry(size.width, size.height, this.roundCornerRadius);
        }
    }

    onBlur(): void {
        const material = this.backgroundMesh.material as THREE.MeshBasicMaterial
        material.color = Color.helper.get('button.blur').multiply(this.color);
        material.transparent = true;
        material.opacity = this.backgroundMeshMaxOpacity
        this.status = 'blur'
    }

    onHover(): void {
        const material = this.backgroundMesh.material as THREE.MeshBasicMaterial
        material.color = Color.helper.get('button.hover').multiply(this.color);
        material.transparent = true;
        material.opacity = this.backgroundMeshMaxOpacity
        this.status = 'hover'
    }

    onPress(): void {
        const material = this.backgroundMesh.material as THREE.MeshBasicMaterial
        material.color = Color.helper.get('button.press').multiply(this.color);
        material.transparent = true;
        material.opacity = this.backgroundMeshMaxOpacity
        this.status = 'press'
    }

    constructor({
        width = 100,
        height = 50,
        text = "",
        style = uiBaselineStyle,
        color = new THREE.Color(1, 1, 1).getHex(),
        cornerRadius = 15,
        shape = 'rectangle',    
        onClick
    }: UIButtonOptions = {}) {
        super();
        this.shape = shape;
        this.roundCornerRadius = cornerRadius;
        this.text = new UIText(text, style, () => {
            const size = { width: width, height: height };
            const bounds = { min: { x: 0, y: 0 }, max: { x: size.width, y: size.height } };
            this.text.position.set(width / 2, 0, 1);
            this.text.setSize(size);
            this.text.setBounds(bounds);
        });
        this.add(this.text);

        let geometry;
        if (this.shape === 'diamond') {
            geometry = this.roundedDiamondGeometry(width, height, cornerRadius);
        } else {
            geometry = this.roundedPlaneGeometry(width, height, cornerRadius);
        }
        const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
        this.backgroundMesh = new THREE.Mesh(geometry, material);
        this.add(this.backgroundMesh);
        this.color = new THREE.Color().setHex(color);

        this.bounds = { max: { x: width / 2, y: height / 2 }, min: { x: -width / 2, y: -height / 2 } }
        this.size = { width: width, height: height }

        // this.onBlur();
        if (onClick) {
            this.onClick = onClick;
            EventManager.self.addPointerMoveListener((event) => {
                if (EventManager.self.pointerPressed || !this.eventEnabled) return;
                if (this.isInBounds(this.size.width, this.size.height, event)) {
                    this.onHover();
                } else {
                    this.onBlur();
                }
            });

            EventManager.self.addPointerDownListener((event) => {
                if (!this.eventEnabled) return;
                if (!this.visibleGlobally) return;
                if (this.isInBounds(this.size.width, this.size.height, event))
                    this.onPress();
            });

            EventManager.self.addPointerUpListener((event) => {
                if (!this.eventEnabled) return;
                if (!this.visibleGlobally) return;
                if (this.isInBounds(this.size.width, this.size.height, event)) {
                    console.log('UIButton clicked', this.text.textMesh.textMesh.text);
                    const clickedTime = performance.now();
                    if (clickedTime - Time.lastClickedTime < UIButton.doubleClickThreshold) {
                        Time.lastClickedTime = performance.now();
                    } else {
                        this.onHover();
                        this.onClick?.();
                        Time.lastClickedTime = performance.now();
                    }
                } else {
                    this.onBlur();
                }
            });
        }
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

    constructor({
        width = 100,
        height = 50,
        text = "",
        style = uiBaselineStyle,
        color = new THREE.Color(1, 1, 1).getHex(),
        cornerRadius = 20,
        shape = 'rectangle',    
        onClick
    }: UIButtonOptions = {}) {
        super({ width, height, text, style, color, cornerRadius, onClick, shape: shape });
        this.shape = shape;
        let geometry;
        if (this.shape === 'diamond') {
            geometry = this.roundedDiamondGeometry(width, height, cornerRadius);
        } else {
            geometry = this.roundedPlaneGeometry(width, height, cornerRadius);
        }
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
        this.onBlur();
    }

    setOpacity(opacity: number): void {
        super.setOpacity(opacity);
        let opacityMapped = Helper.map(opacity, 0, 1, 0, this.opaqueBackgroundMaxOpacity);
        let material = this.opaqueBackground.material as THREE.MeshPhysicalMaterial;
        material.opacity = opacityMapped;
    }

    setSize(size: { width: number; height: number; }): void {
        super.setSize(size);
        this.opaqueBackground.geometry.dispose();
        if (this.shape === 'diamond') { 
            this.opaqueBackground.geometry = this.roundedDiamondGeometry(size.width, size.height, this.roundCornerRadius);
        } else {
            this.opaqueBackground.geometry = this.roundedPlaneGeometry(size.width, size.height, this.roundCornerRadius);
        }
    }
}

export class UIImageButton extends UIButton {
    imageView: UIImageView

    setOpacity(opacity: number): void {
        super.setOpacity(opacity);
        const material = this.imageView.mesh.material as THREE.ShaderMaterial;
        material.transparent = true;
        material.opacity = opacity;
        this.imageView.setOpacity(opacity);
    }

    constructor(imageTexture: THREE.Texture, {
        width = 100,
        height = 100,
        text = "",
        cornerRadius = 20,
        onClick
    }: {
        width?: number;
        height?: number;
        text?: string;
        cornerRadius?: number;
        onClick?: () => void;
    } = {}) {
        super({ width, height, text: text, cornerRadius, onClick, color: new THREE.Color(0, 0, 0).getHex() });
        this.imageView = new UIImageView({x: 0, y: 0, width: width, height: height}, imageTexture, height / 2);
        this.add(this.imageView);
        this.imageView.position.set(0, height / 2, 0.1);
        (this.backgroundMesh.material as THREE.MeshBasicMaterial).opacity = 1
    }

    onHover(): void {
        super.onHover();
        this.setOpacity(1.0);
    }
    
    onBlur(): void {    
        super.onBlur();
        this.setOpacity(0.5);
    }
    
    onPress(): void {
        super.onPress();
        this.setOpacity(0.2);
    }

    setSize(size: { width: number; height: number; }): void {
        super.setSize(size);
        this.imageView.setSize(size);
    }
}