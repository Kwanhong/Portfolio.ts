import * as THREE from "three";
import { UIView } from "./UIView";
import { UIObject } from "./UIObject";

export class UIVideoView extends UIView {
    videoPlayer: VideoPlayer;

    constructor(bounds: { x: number; y: number; width: number; height: number }, videoSrc: string, roundCorner: number = 7) {
        super(bounds, roundCorner);

        this.videoPlayer = new VideoPlayer(videoSrc, bounds.width, bounds.height, roundCorner);
        this.add(this.videoPlayer);
        this.videoPlayer.position.set(bounds.x, bounds.y - bounds.height / 2, 0.1); // UIView 위에 위치하도록 z축 약간 이동
    }

    playVideo(): void {
        this.videoPlayer.play();
    }

    pauseVideo(): void {
        this.videoPlayer.pause();
    }

    stopVideo(): void {
        this.videoPlayer.stop();
    }
}

export class VideoPlayer extends UIObject {
    private videoElement: HTMLVideoElement;
    private videoTexture: THREE.VideoTexture;
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

        // 3. VideoMaterial 생성
        this.videoMaterial = new THREE.MeshBasicMaterial({
            map: this.videoTexture,
            side: THREE.DoubleSide,
        });

        // 4. PlaneGeometry를 사용해 비디오 화면 생성
        const geometry = this.roundedPlaneGeometry(width, height, roundCorner);
        this.videoMesh = new THREE.Mesh(geometry, this.videoMaterial);
        this.add(this.videoMesh); // Object3D에 추가
    }

    // 비디오 재생
    play(): void {
        this.videoElement.play();
    }

    // 비디오 일시정지
    pause(): void {
        this.videoElement.pause();
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