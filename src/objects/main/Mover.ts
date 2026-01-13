import { UIObject } from '@ui/base/UIObject';
import * as THREE from 'three';

export class Mover extends THREE.Object3D {
    velocity: THREE.Vector3;
    acceleration: THREE.Vector3
    mass: number = 0.7;
    constructor() {
        super();
        this.velocity = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();
    }

    applyForce(force: THREE.Vector3) {
        force.divideScalar(this.mass);
        this.acceleration.add(force);
    }

    update(dt: number) {
        this.velocity.add(this.acceleration.clone().multiplyScalar(dt));
        this.position.add(this.velocity.clone().multiplyScalar(dt));
        this.acceleration.set(0, 0, 0); // Reset acceleration after each update
    }
}

export class UIMover extends UIObject {
    velocity: THREE.Vector3;
    acceleration: THREE.Vector3
    mass: number = 0.7;
    constructor() {
        super();
        this.velocity = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();
    }

    applyForce(force: THREE.Vector3) {
        force.divideScalar(this.mass);
        this.acceleration.add(force);
    }

    update(dt: number) {
        super.update(dt);
        this.velocity.add(this.acceleration.clone().multiplyScalar(dt));
        this.position.add(this.velocity.clone().multiplyScalar(dt));
        this.acceleration.set(0, 0, 0); // Reset acceleration after each update
    }
}