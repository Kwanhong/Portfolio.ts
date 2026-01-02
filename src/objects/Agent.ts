import * as THREE from 'three'
import { Color } from '@data/Color'
import { Mover } from './Mover'
import type { FlowField } from '../physics/FlowField'
import { lerp } from 'three/src/math/MathUtils.js'
import { Helper } from '../core/Helper'

export class Agent extends Mover {
    private mesh: THREE.Mesh

    private fear: number = 1
    private seperation: number = 50
    private neighboring: number = 100

    private maxSpeed: number = 50
    private maxForce: number = 20

    private satisfactionRadius: number = 50

    constructor() {
        super()

        const geometry = new THREE.ConeGeometry(4, 15, 3)
        const material = new THREE.MeshBasicMaterial({ color: Color.helper.get('foreground.secondary') })
        this.mesh = new THREE.Mesh(geometry, material)
        

        this.add(this.mesh)
    }

    private desireOfPeering = new THREE.Vector3()

    scatter(origin: THREE.Vector3): void {
        const radius = 100
        const maxForce = 150
        const distance = this.position.distanceTo(origin)
        if (distance < radius) {
            const fleeForce = new THREE.Vector3().subVectors(this.position, origin).normalize().multiplyScalar(maxForce)
            this.applyForce(fleeForce)
        }
    }

    seek(target: THREE.Vector3) {
        let desired = new THREE.Vector3().subVectors(target, this.position)
        let desire = desired.length()

        if (desire < this.satisfactionRadius) {
            desired.multiplyScalar(0.1)
        } else {
            desired.setLength(this.maxSpeed)
        }

        let steer = new THREE.Vector3().subVectors(desired, this.velocity)
        steer.clampLength(0, this.maxForce)

        return steer
    }

    follow(flow: FlowField) {
        let desired = flow.lookup(this.position)
        desired.setLength(this.maxSpeed * 2)

        let steer = new THREE.Vector3().subVectors(desired, this.velocity)
        steer.clampLength(0, this.maxForce)
        this.applyForce(steer)
    }

    seperate(others: Agent[]) {
        let desiredSeperation = this.seperation
        let sum = new THREE.Vector3()
        let seperationOccured = false
        for (let other of others) {
            let dist = this.position.distanceTo(other.position)
            if (this != other && dist < desiredSeperation) {
                let diff = new THREE.Vector3().subVectors(this.position, other.position).setLength(1 / dist)
                sum = sum.addVectors(sum, diff)
                seperationOccured = true
            }
        }
        if (seperationOccured) {
            sum.setLength(this.maxSpeed)
            let steer = new THREE.Vector3().subVectors(sum, this.velocity)
            steer.clampLength(0, this.maxForce * this.fear)
            this.applyForce(steer)
        }
    }

    align(boids: Agent[]) {
        let neighborDist = this.neighboring
        let sum = new THREE.Vector3()
        let neighboringOccured = false
        for (let other of boids) {
            let dist = this.position.distanceTo(other.position)
            if (this != other && dist < neighborDist) {
                sum.add(other.velocity);
                neighboringOccured = true
            }
        }

        if (neighboringOccured) {
            sum.setLength(this.maxSpeed);
            let steer = new THREE.Vector3().subVectors(sum, this.velocity);
            steer.clampLength(0, this.maxForce);
            this.applyForce(steer)
        }
    }

    cohesion(boids: Agent[]) {
        let neighborDist = 50;
        let sum = new THREE.Vector3()
        let count = 0;
        for (let other of boids) {
            let d = this.position.distanceTo(other.position);
            if ((this !== other) && (d < neighborDist)) {
                sum.add(other.position);
                count++;
            }
        }
        if (count > 0) {
            sum.divideScalar(count);
            let seek = this.seek(sum);
            this.applyForce(seek)
        }
    }

    flock(boids: Agent[]) {
        this.seperate(boids)
        this.align(boids)
        this.cohesion(boids)
    }

    update(dt: number): void {
        super.update(dt)
        this.look()
    }

    private angularNoiseOff = 0
    private turnBack = false
    private look() {

        // this.rotation.z = Math.atan2(this.velocity.y, this.velocity.x) - Math.PI / 2

        // Immersive Look 
        let wannaLookPeers = Math.atan2(this.desireOfPeering.y, this.desireOfPeering.x) - Math.PI / 2
        let wannaGoMyWay = Math.atan2(this.velocity.y, this.velocity.x) - Math.PI / 2

        this.rotation.z = lerp(
            wannaGoMyWay, wannaLookPeers, Helper.map(
                Helper.noise(this.angularNoiseOff, 0), -10, 10, 0, 0.000001
            )
        );

        if (!this.turnBack) {
            this.angularNoiseOff += 0.1
        } else {
            this.angularNoiseOff -= 0.1
        }
        if (this.angularNoiseOff > 10 || this.angularNoiseOff < -10) this.turnBack = !this.turnBack
    }
}