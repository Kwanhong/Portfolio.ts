import * as THREE from "three";
import { UIView } from '@ui/base/UIView';
import { UIObject } from '@ui/base/UIObject';
import { EventManager } from "../../event/EventManager";
import { Camera } from "../../scene/Camera";
import type { overlayPageInfo } from "@data/Info";
import { UIText } from "@ui/base/UIText";
import { defaultDescriptionStyle, defaultHeadlineStyle, type TextStyle } from "@ui/styles/TextStyle";
import { FileManager } from "../../core/FIleManager";
import { UIImageView } from "./UIImageView";
import { UIVideoView } from "./UIVideoView";
import { Language } from "@data/Language";
import { Time } from "../../core/Time";

export class UIPage extends UIObject {
    info: overlayPageInfo;
    constructor(info: overlayPageInfo, size: { width?: number; height?: number }) {
        super();
        this.info = info;
        this.setSize({ width: size.width || 420, height: size.height || 400 });

        const mediaWidth = (size.width || 420) / 2 - 40;
        // 여기서 info를 사용하여 페이지 내용을 구성
        // 제목, 메시지, 이미지 혹은 비디오
        const headlineStyle: TextStyle = { ...defaultHeadlineStyle, textAlign: 'left', anchorX: 'left', anchorY: 'top', fontSize: 17 };
        const title = new UIText(Language.helper.get('use.string.key', info.title), headlineStyle, (_, hSize) => {
            title.setSize({ width: this.size.width - mediaWidth - 40, height: Infinity });
            title.position.set(title.size.width / 2, -this.size.height / 2, 0.1);
            title.translateX(-this.size.width / 2 + mediaWidth + 40);

            // 메시지
            const descriptionStyle: TextStyle = { ...defaultDescriptionStyle, textAlign: 'left', anchorX: 'left', anchorY: 'top' };
            const message = new UIText(Language.helper.get('use.string.key', info.message), descriptionStyle, () => {
                message.setSize({ width: this.size.width - mediaWidth - 60, height: Infinity });
                message.position.set(message.size.width / 2, -this.size.height / 2 - hSize.height - 10, 0.1);
                message.translateX(-this.size.width / 2 + mediaWidth + 40);
            });
            this.add(message);
        });
        this.add(title);

        if (this.info.imageUrl) {
            FileManager.loadTexture(this.info.imageUrl).then((texture) => {
                const aspectRatio = texture.image.width / texture.image.height;
                const width = mediaWidth
                const height = width / aspectRatio;

                const image = new UIImageView({ x: 0, y: 0, width: width, height: height }, texture);
                this.add(image);
                image.position.set(0, -this.size.height / 2 + height / 2 - 40, 0.1);
                image.translateX(-this.size.width / 2 + width / 2 + 20);
            });
        } else if (this.info.videoUrl) {
            const width = mediaWidth
            const video = new UIVideoView({ x: 0, y: 0, width: width, height: width }, this.info.videoUrl);
            video.visible = false
            Time.coroutine(() => { return video.getVideoSize().width != 0 }, () => { }, () => {
                const videoSize = video.getVideoSize();
                const aspectRatio = videoSize.width / videoSize.height;
                const height = width / aspectRatio;
                video.setSize({ width: width, height: height });
                video.position.set(0, -this.size.height / 2 + height / 2 - 40, 0.1);
                video.visible = true;
                video.alwaysPlay = true
                video.playVideo();
                video.translateX(-this.size.width / 2 + width / 2 + 20);
            });
            this.add(video);
        }
    }
}

export class UIPagingView extends UIView {

    private pages: UIObject[] = [];
    private currentPageIndex: number = 0;
    private indicatorDots: THREE.Mesh[] = [];

    constructor(pages: overlayPageInfo[], bounds: { x: number; y: number; width: number; height: number }) {
        super(bounds);
        const material = new THREE.MeshPhysicalMaterial({
            transmission: 1.0, // Fully transparent to the background capture
            roughness: 0.4,    // Controls the amount of blur (0 is clear, 1 is very blurred)
            thickness: 1.7,    // Required for roughness to take effect
            ior: 1.5,          // Index of refraction
        })
        const geometry = this.roundedPlaneGeometry(bounds.width, bounds.height, 10);
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
        this.mesh = mesh;

        // 페이지들 생성 및 추가
        this.pages = pages.map(info => new UIPage(info, { width: bounds.width, height: bounds.height }));
        for (const page of this.pages) {
            page.position.set(0, bounds.height / 2, 0.1); // UIView 위에 위치하도록 z축 약간 이동
            page.visible = false;
            this.add(page);
        }
        if (this.pages.length > 0) {
            this.pages[0].visible = true;
        }

        // 페이지 인디케이터 도트 생성
        const dotSpacing = 15;
        const dotRadius = 4;
        const totalWidth = (this.pages.length - 1) * dotSpacing;

        for (let i = 0; i < this.pages.length; i++) {
            const geometry = new THREE.CircleGeometry(dotRadius, 32);
            const material = new THREE.MeshBasicMaterial({ color: i === 0 ? 0xffffff : 0x888888 });
            const dot = new THREE.Mesh(geometry, material);
            dot.position.set(-totalWidth / 2 + i * dotSpacing, -this.size.height / 2 + 20, 0.2);
            this.indicatorDots.push(dot);
            this.add(dot);
        }

        EventManager.self.addPointerDownListener((event) => {
            const rect = Camera.getMouseWorldPosition(event);
            if (this.isPointInside(rect.x, rect.y)) {
                const localX = rect.x - this.mesh.position.x;
                if (localX < 0) {
                    this.previousPage();
                } else {
                    this.nextPage();
                }
                this.updateIndicatorDots();
            }
        });
    }

    private updateIndicatorDots(): void {
        for (let i = 0; i < this.indicatorDots.length; i++) {
            const dot = this.indicatorDots[i];
            const material = dot.material as THREE.MeshBasicMaterial;
            material.color.set(i === this.currentPageIndex ? 0xffffff : 0x888888);
            material.needsUpdate = true;
        }
    }

    private isPointInside(x: number, y: number): boolean {
        const localPos = new THREE.Vector3();
        this.worldToLocal(localPos.set(x, y, 0));
        const halfWidth = this.size.width / 2;
        const halfHeight = this.size.height / 2;
        return localPos.x >= -halfWidth && localPos.x <= halfWidth && localPos.y >= -halfHeight && localPos.y <= halfHeight;
    }

    showPage(index: number): void {
        if (index < 0 || index >= this.pages.length) return;

        this.pages[this.currentPageIndex].visible = false;
        this.currentPageIndex = index;
        this.pages[this.currentPageIndex].visible = true;
        this.updateIndicatorDots();
    }

    nextPage(): void {
        const nextIndex = (this.currentPageIndex + 1) % this.pages.length;
        this.showPage(nextIndex);
    }

    previousPage(): void {
        const prevIndex = (this.currentPageIndex - 1 + this.pages.length) % this.pages.length;
        this.showPage(prevIndex);
    }
}