import { UIObject } from './UIObject';
import * as THREE from 'three';
import type { UIText } from './UIText';
import type { UIButton } from './UIButton';
import type { UIImageView } from './UIImageView';

export interface UIStackViewOptions {
    axis?: 'horizontal' | 'vertical';
    spacing?: number;
}

export class UIStackView extends UIObject {
    private spacing: number;
    private axis: 'horizontal' | 'vertical';

    constructor(options: UIStackViewOptions = {}) {
        super();
        this.axis = options.axis || 'vertical';
        this.spacing = options.spacing || 10;
    }

    add(object: THREE.Object3D): this {
        super.add(object);
        return this;
    }

    addStack(object: UIObject): this {
        super.addUI(object);
        this.size = { width: Math.max(this.size.width, object.size.width), height: Math.max(this.size.height, object.size.height) };
        this.bounds = { min: { x: this.bounds.min.x, y: this.bounds.min.y }, max: { x: this.bounds.min.x + this.size.width, y: this.bounds.min.y + this.size.height } };
        this.updateLayout();
        return this;
    }

    updateLayout(fillScreen: boolean = true): void {

        for (const child of this.uiChildren) {
            if (!fillScreen) break;
            const text = child as UIText
            const button = child as UIButton
            const image = child as UIImageView
            if (text.textMesh) {
                const textHeight = text.textMesh.textMesh.geometry.boundingBox?.min.y ?? this.size.height;
                text.setSize({ width: this.size.width - this.spacing * 2, height: -textHeight });
            } else if (button) {
                button.setSize({ width: this.size.width - this.spacing * 2, height: button.size.height });
            } else if (image) {
                image.setSize({ width: this.size.width - this.spacing * 2, height: image.size.height });
            }   
        }

        let offset = 0;
        if (this.axis === 'vertical') {
            this.size.height = this.spacing;
        } else {
            this.size.width = 0;
        }

        for (const child of this.uiChildren) {
            if (this.axis === 'vertical') {
                child.position.set(0, - this.size.height - this.spacing * 1.5, 10);
                this.size.height += child.size.height + this.spacing
                if ((child as UIImageView).image || (child as UIText).textMesh) {
                    this.size.height += this.spacing * 2
                }
                console.log('Stack Child Pos Y: ', child.position.y, 'Child: ', (child as UIText).textMesh == null ? 'UIButton' : 'UIText');
            } else {
                child.position.set(offset - this.size.width / 2, this.size.height, 10);
                offset += child.size.width || 0;
                offset += this.spacing;
            }
        }
        for (const child of this.uiChildren) {
            if (this.axis === 'vertical') {
                child.position.y += this.size.height / 2 - this.spacing / 2;
            }
        }
    }
}