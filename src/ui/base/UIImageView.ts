import { UIObject } from "./UIObject";
import * as THREE from "three";
export class UIImageView extends UIObject {
    mesh: THREE.Mesh;
    image?: HTMLImageElement | null = null;

    constructor(bounds: { x: number; y: number; width: number; height: number }, texture: THREE.Texture, roundCorner: number = 7) {
        super();

        const geometry = new THREE.PlaneGeometry(bounds.width, bounds.height);
        const material = new MaskedMaterial(texture, { width: bounds.width, height: bounds.height }, roundCorner);

        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
        this.mesh.position.set(bounds.x, -bounds.height / 2 + bounds.y, 0);

        this.image = texture.image as HTMLImageElement | null;

        this.bounds = { max: { x: bounds.width / 2, y: bounds.height / 2 }, min: { x: -bounds.width / 2, y: -bounds.height / 2 } }
        this.size = { width: bounds.width, height: bounds.height };
    }

    setTexture(texture: THREE.Texture): void {
        const material = this.mesh.material as THREE.MeshBasicMaterial;
        material.map = texture;
        material.needsUpdate = true;
    }

    setSize(size: { width: number; height: number }): void {

        if (this.image) {
            size.height = size.width * (this.image.height / this.image.width)
        }

        this.size = size;
        this.bounds = { max: { x: size.width / 2, y: size.height / 2 }, min: { x: -size.width / 2, y: -size.height / 2 } }
        this.mesh.geometry.dispose();
        const geometry = new THREE.PlaneGeometry(size.width, size.height);
        this.mesh.geometry = geometry;
        this.mesh.position.set(this.mesh.position.x, - size.height / 2, 0);
    }

    setOpacity(opacity: number): void {
        const material = this.mesh.material as MaskedMaterial;
        material.uniforms.uOpacity.value = opacity;
        material.needsUpdate = true;
    }   

}

export class MaskedMaterial extends THREE.ShaderMaterial {
    constructor(texture: THREE.Texture, size: { width: number, height: number }, cornerRadius: number) {
        let aspect = 1
        const image = texture.image as HTMLImageElement
        if (image) {
            aspect = image.width / image.height
            cornerRadius = cornerRadius / Math.max(size.width, size.height)
        }
        super({
            uniforms: {
                uTexture: { value: texture }, // 텍스처
                uCornerRadius: { value: cornerRadius }, // 코너 반경
                uAspect: { value: aspect }, // 텍스처의 가로세로 비율
                uOpacity: { value: 1.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv; // UV 좌표 전달
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform float uCornerRadius;
                uniform float uAspect; // 텍스처의 가로세로 비율
                uniform float uOpacity;
                varying vec2 vUv;

                void main() {
                    // 텍스처의 UV 좌표를 기준으로 픽셀 위치 계산
                    vec2 uv = vUv;

                    // 코너 반경을 UV 좌표에서 가로/세로 비율에 맞게 조정
                    float radiusX = uCornerRadius / uAspect; // 가로 방향 반경
                    float radiusY = uCornerRadius;           // 세로 방향 반경

                    // 각 코너의 중심 좌표 계산
                    vec2 topLeft = vec2(radiusX, 1.0 - radiusY);
                    vec2 topRight = vec2(1.0 - radiusX, 1.0 - radiusY);
                    vec2 bottomLeft = vec2(radiusX, radiusY);
                    vec2 bottomRight = vec2(1.0 - radiusX, radiusY);

                    // 각 코너와 현재 픽셀 간의 거리 계산
                    float distTopLeft = length((uv - topLeft) / vec2(radiusX, radiusY));
                    float distTopRight = length((uv - topRight) / vec2(radiusX, radiusY));
                    float distBottomLeft = length((uv - bottomLeft) / vec2(radiusX, radiusY));
                    float distBottomRight = length((uv - bottomRight) / vec2(radiusX, radiusY));

                    // 픽셀이 코너 반경 밖에 있으면 마스킹
                    if ((uv.x < radiusX && uv.y > 1.0 - radiusY && distTopLeft > 1.0) ||
                        (uv.x > 1.0 - radiusX && uv.y > 1.0 - radiusY && distTopRight > 1.0) ||
                        (uv.x < radiusX && uv.y < radiusY && distBottomLeft > 1.0) ||
                        (uv.x > 1.0 - radiusX && uv.y < radiusY && distBottomRight > 1.0)) {
                        discard;
                    }

                    // 텍스처 색상 출력
                    vec4 texColor = texture2D(uTexture, uv);

                    // 투명도 적용
                    texColor.a *= uOpacity;
                    gl_FragColor = texColor;
                }
            `,
            transparent: true, // 투명도 활성화
        });
    }

    /**
     * 코너 반경 업데이트
     */
    setCornerRadius(cornerRadius: number): void {
        this.uniforms.uCornerRadius.value = cornerRadius;
    }

    /**
     * 텍스처 업데이트
     */
    setTexture(texture: THREE.Texture): void {
        this.uniforms.uTexture.value = texture;
        // this.uniforms.uTexture.needsUpdate = true;
    }

    /**
     * 가로세로 비율 업데이트
     */
    setAspect(aspect: number): void {
        this.uniforms.uAspect.value = aspect;
    }
}