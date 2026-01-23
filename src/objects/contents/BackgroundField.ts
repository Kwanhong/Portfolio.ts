import { UIObject } from "@ui/base/UIObject";
import * as THREE from "three";
import { Color } from "@data/Color";
import { UIMover } from "@objects/main/Mover";
import { EventManager } from "../../event/EventManager";
import { Camera } from "../../scene/Camera";
import { Helper } from "../../core/Helper";

class Blob extends UIMover {

    pivots: THREE.Vector3[] = []
    pivotIndex: number = 0;
    private springConstant: number = 20;
    private friction: number = 0.95;
    private color: THREE.Color = new THREE.Color();

    constructor(radius: number, color: string) {
        super()
        const geometry = this.roundedPlaneGeometry(radius, radius, radius / 2);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
        this.color = new THREE.Color(Color.helper.getHexNumberFromHexString(color));
    }

    update(dt: number): void {
        this.acceleration.clampScalar(-1500, 1500);
        super.update(dt);

        // Pivot로 돌아가기 위한 힘 적용
        const toPivot = new THREE.Vector3().subVectors(this.pivots[this.pivotIndex], this.position);
        const distance = toPivot.length();
        if (distance > 0.1) {
            toPivot.normalize();
            const strength = distance * this.springConstant; // 거리 비례 힘
            const force = toPivot.multiplyScalar(strength);
            this.applyForce(force);
        }

        // 마찰력 적용
        this.velocity.multiplyScalar(this.friction);
        this.position.z = -200;

        let diff = new THREE.Vector3().subVectors(this.pivots[this.pivotIndex], this.position).length();
        diff = Helper.map(diff, 0, 50, 0.4, 1);
        const material = (this.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial
        // Getting Lighter color when far from pivot
        material.color = this.color.clone().multiplyScalar(diff);
    }
}

class Line extends UIObject {
    blob1: UIObject
    blob2: UIObject
    mesh: THREE.Mesh
    weight: number
    color: string
    constructor(blob1: UIObject, blob2: UIObject, weight: number, color: string) {
        super()
        this.blob1 = blob1
        this.blob2 = blob2
        this.weight = weight
        this.color = color

        const lineGeometry = this.singleLineGreometry(

            { x: blob1.position.x, y: blob1.position.y },
            { x: blob2.position.x, y: blob2.position.y },

            weight
        );

        const lineMaterial = new THREE.MeshBasicMaterial({
            color: color
        });
        const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);
        this.add(lineMesh);
        this.mesh = lineMesh;
        lineMesh.position.z = -205;
    }

    update(dt: number): void {
        super.update(dt);
        this.mesh.geometry.dispose();
        this.mesh.geometry = this.singleLineGreometry(

            { x: this.blob1.position.x, y: this.blob1.position.y },
            { x: this.blob2.position.x, y: this.blob2.position.y },
            this.weight
        );
    }
}

export class BackgroundField extends UIObject {
    blobs: Blob[] = [];
    lines: Line[] = [];
    private needsToUpdate = false
    constructor(size: { width: number; height: number }, resolution: number) {

        size.width = size.width + resolution * 2
        size.height = size.height + resolution * 2

        size.width = Math.min(size.width, 600)
        size.height = Math.min(size.height, 600)

        super();

        const lineColor = "#383838";
        const blobColor = "#373737";
        const radius = resolution / 6;
        let perspectiveOffsets = 2.0;
        const perspectiveSpacing = (perspectiveOffsets - 0.75) / (size.height / resolution)

        for (let y = 0; y < size.height; y += resolution) {
            for (let x = 0; x < size.width; x += resolution) {
                const blob = new Blob(radius, blobColor);
                blob.position.x = (x - size.width / 2 + resolution / 2)
                blob.position.y = (y - size.height / 2 + resolution / 2);
                blob.position.z = -200;

                const posX = blob.position.clone().x * perspectiveOffsets;
                const posY = blob.position.clone().y * (perspectiveOffsets * 0.5 + 0.5);
                const pivot = new THREE.Vector3(posX, posY, blob.position.clone().z)
                blob.pivots.push(pivot.clone());
                pivot.x *= 2
                pivot.y *= 1.75
                blob.pivots.push(pivot);
                blob.pivotIndex = 0;

                this.blobs.push(blob);
                this.add(blob);
            }
            perspectiveOffsets -= perspectiveSpacing
        }

        for (let i = 0; i < this.blobs.length; i++) {

            const blob1 = this.blobs[i];
            const x = blob1.position.clone().x + size.width / 2 - resolution / 2;
            const y = blob1.position.clone().y + size.height / 2 - resolution / 2;

            // Line 생성 (오른쪽 연결)
            if (x + resolution < size.width) {
                const blob2 = this.blobs[i + 1];
                if (!blob2) continue;
                const line = new Line(blob1, blob2, resolution / 16, lineColor);
                this.add(line);
                this.lines.push(line);
            }

            // Line 생성 (아래쪽 연결)
            if (y + resolution < size.height) {
                const offset = Math.floor(size.width / resolution);
                const blob2 = this.blobs[i + offset + 1]
                if (!blob2) continue;
                const line = new Line(blob1, blob2, resolution / 16, lineColor);
                this.add(line);
                this.lines.push(line);
            }
        }

        EventManager.self.addPointerMoveListener((event) => this.lastPointerEvent = event);
    }

    lastPointerEvent: PointerEvent = new PointerEvent('pointermove');

    run() {
        this.setDepth(0);
    }

    setDepth(index: number): void {
        this.blobs.forEach(blob => {
            blob.pivotIndex = index;
        });
        this.needsToUpdate = true

        // Start motion
        this.blobs[Math.floor(this.blobs.length / 2)].velocity.set(10, 0, 0);
    }

    applyForce(target: THREE.Vector3, force: THREE.Vector3): void {
        this.blobs.forEach(blob => {
            const direction = new THREE.Vector3().subVectors(blob.position, target);
            const distance = direction.length();
            const strength = force.length() / (distance * distance); // Inverse square law
            direction.normalize().multiplyScalar(-strength);
            blob.applyForce(direction);
        });
        this.needsToUpdate = true
    }

    update(dt: number): void {
        super.update(dt);

        if (!this.visible) return
        // if (EventManager.self.pointerPressed) {
            const randX = (Math.random() - 0.5) * 0.5;
            const randY = (Math.random() - 0.5) * 0.5;
            const force = new THREE.Vector3(randX, randY, 0).multiplyScalar(500000000);
            const target = Camera.getMouseWorldPosition(this.lastPointerEvent);
            this.applyForce(target, force);
        // }

        if (!this.needsToUpdate) return;
        this.blobs.forEach(blob => blob.update(dt));

        if (this.blobs[Math.floor(this.blobs.length / 2)]?.velocity.length() < 0.01) {
            this.needsToUpdate = false
            return;
        }

        this.lines.forEach(line => line.update(dt));
    }
}  