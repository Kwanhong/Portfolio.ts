import * as THREE from 'three';
import { Color } from '@data/Color'
import { Helper } from '../../core/Helper';
import { Camera } from '../../scene/Camera'
import type { Scene } from '../../scene/scenes/Scene';

export class FlowField {

    private resolution: number;
    private cols: number;
    private rows: number;
    private field: THREE.Vector3[];
    indicators: THREE.Object3D[]

    constructor(resolution: number, width: number, height: number) {
        width = Math.min(width, 800)
        height = Math.min(height, 600)
        this.resolution = resolution;
        this.cols = Math.floor(width / this.resolution);
        this.rows = Math.floor(height / this.resolution);
        this.field = new Array(this.cols * this.rows);
        this.indicators = []
        this.init();
    }

    init() {
        const tol = 0.1
        let xoff = 0
        for (let y = 0; y < this.rows; y++) {
            let yoff = 0
            for (let x = 0; x < this.cols; x++) {
                let angle = Helper.map(Helper.noise(xoff, yoff), 0, 1, -Math.PI * 2, Math.PI * 2);
                const v = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
                this.field[x + y * this.cols] = v;
                let geometry = new THREE.ConeGeometry(2, 13, 3)
                let material = new THREE.MeshBasicMaterial({ color: Color.helper.get('background.secondary') })
                let indicator = new THREE.Mesh(geometry, material)
                indicator.position.x = x * this.resolution - this.resolution * this.cols / 2 + 0.5 * this.resolution
                indicator.position.y = y * this.resolution - this.resolution * this.rows / 2 + 0.5 * this.resolution
                indicator.position.z = -100
                indicator.rotation.z = angle - Math.PI / 2
                this.indicators.push(indicator)

                yoff += tol;
            }
            xoff += tol;
        }
    }

    showIndicators(scene: Scene) {
        for (const indicator of this.indicators) {
            scene.self.add(indicator)
        }
    }

    hideIndicators(scene: Scene) {
        for (const indicator of this.indicators) {
            scene.self.remove(indicator)
        }
    }

    updateIndicators() {
        var count = 0
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.indicators[count].position.x = x * this.resolution - this.resolution * this.cols / 2 + 0.5 * this.resolution
                this.indicators[count].position.y = y * this.resolution - this.resolution * this.rows / 2 + 0.5 * this.resolution
                count++
            }
        }
    }

    lookup(lookup: THREE.Vector3): THREE.Vector3 {
        const adjusted = new THREE.Vector2(lookup.x + Camera.size.width / 2, lookup.y + Camera.size.height / 2)
        const column = Math.floor(THREE.MathUtils.clamp(adjusted.x / this.resolution, 0, this.cols - 1));
        const row = Math.floor(THREE.MathUtils.clamp(adjusted.y / this.resolution, 0, this.rows - 1));
        return this.field[column + row * this.cols]?.clone() ?? new THREE.Vector3();
    }
}