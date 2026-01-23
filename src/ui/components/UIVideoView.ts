import * as THREE from "three";
import { UIView } from '@ui/base/UIView';
import { UIObject } from '@ui/base/UIObject';
import { EventManager } from "../../event/EventManager";
import { Camera } from "../../scene/Camera";

export class UIVideoView extends UIView {
    videoPlayer: VideoPlayer;
    alwaysPlay: boolean = false;

    constructor(bounds: { x: number; y: number; width: number; height: number }, videoSrc: string, roundCorner: number = 7) {
        super(bounds, roundCorner);
        this.remove(this.mesh); // UIView의 기본 메쉬 제거
        this.videoPlayer = new VideoPlayer(videoSrc, bounds.width, bounds.height, roundCorner);
        this.add(this.videoPlayer);
        this.videoPlayer.position.set(bounds.x, bounds.y - bounds.height / 2, 0.1); // UIView 위에 위치하도록 z축 약간 이동
    
        EventManager.self.addPointerMoveListener((event) => {
            if (this.alwaysPlay) return;
            const rect = Camera.getMouseWorldPosition(event);
            if (this.isPointInside(rect.x, rect.y)) {
                this.videoPlayer.play();
            } else {
                this.videoPlayer.pause();
            }
        });
    }

    getVideoSize(): { width: number; height: number } {
        return this.videoPlayer.getVideoSize();
    }

    setSize(size: { width: number; height: number; }): void {
        this.size = size;
        this.bounds = { max: { x: size.width / 2, y: size.height / 2 }, min: { x: -size.width / 2, y: -size.height / 2 } }
        this.videoPlayer.position.set(this.videoPlayer.position.x, -size.height / 2, 0.1);
        this.videoPlayer.setSize(size);
    }

    isPointInside(x: number, y: number): boolean {
        const localPos = new THREE.Vector3();
        this.worldToLocal(localPos.set(x, y, 0));
        const halfWidth = this.size.width / 2;
        const halfHeight = this.size.height / 2;
        return localPos.x >= -halfWidth && localPos.x <= halfWidth && localPos.y >= -halfHeight * 2 && localPos.y <= 0;
    }

    playVideo(): void {
        this.videoPlayer.play();
    }

    pauseVideo(): void {
        if (this.alwaysPlay) return;
        this.videoPlayer.pause();
    }

    stopVideo(): void {
        if (this.alwaysPlay) return;
        this.videoPlayer.stop();
    }
}

export class VideoPlayer extends UIObject {
    private videoElement: HTMLVideoElement;
    videoTexture: THREE.VideoTexture;
    private videoMaterial: THREE.MeshBasicMaterial;
    private videoMesh: THREE.Mesh;

    constructor(videoSrc: string, width: number = 16, height: number = 9, roundCorner: number = 7) {
        super();

        // 1. HTMLVideoElement 생성
        this.videoElement = document.createElement("video");
        this.videoElement.src = videoSrc;
        this.videoElement.crossOrigin = "anonymous"; // 크로스 오리진 허용
        this.videoElement.loop = true; // 기본적으로 반복 재생
        this.videoElement.muted = true; // 음소거
        this.videoElement.playsInline = true; // 모바일 브라우저에서 인라인 재생 허용
        this.videoElement.style.display = "none"; // DOM에 표시되지 않도록 숨김

        // 2. VideoTexture 생성
        this.videoTexture = new THREE.VideoTexture(this.videoElement);
        this.videoTexture.minFilter = THREE.LinearFilter;
        this.videoTexture.magFilter = THREE.LinearFilter;
        this.videoTexture.format = THREE.RGBFormat;

        this.videoTexture.colorSpace = THREE.SRGBColorSpace;
        // 3. VideoMaterial 생성
        this.videoMaterial = new THREE.MeshBasicMaterial({
            map: this.videoTexture,
            side: THREE.DoubleSide,
            color: 0xffffff,
        });

        // 4. PlaneGeometry를 사용해 비디오 화면 생성
        const geometry = this.roundedPlaneGeometry(width, height, roundCorner);
        this.videoMesh = new THREE.Mesh(geometry, this.videoMaterial);
        this.add(this.videoMesh); // Object3D에 추가
    }

    setSize(size: { width: number; height: number; }): void {
        this.videoMesh.geometry.dispose();
        const geometry = this.roundedPlaneGeometry(size.width, size.height, 7);
        this.videoMesh.geometry = geometry;
    }

    getVideoSize(): { width: number; height: number } {
        return { width: this.videoElement.videoWidth, height: this.videoElement.videoHeight };
    }

    // 비디오 재생
    play(): void {
        this.videoElement.play();
        this.videoMaterial.color.set(0xffffff); // 비디오 재생 시 원래 색상으로 설정
    }

    // 비디오 일시정지
    pause(): void {
        this.videoElement.pause();
        this.videoMaterial.color.set(0x777777); // 비디오 일시정지 시 회색조로 변경
    }

    // 비디오 시크 (초 단위)
    seek(time: number): void {
        if (time >= 0 && time <= this.videoElement.duration) {
            this.videoElement.currentTime = time;
        }
    }

    // 비디오 정지
    stop(): void {
        this.videoElement.pause();
        this.videoElement.currentTime = 0;
    }

    // 비디오 상태 확인
    isPlaying(): boolean {
        return !this.videoElement.paused && !this.videoElement.ended;
    }
}