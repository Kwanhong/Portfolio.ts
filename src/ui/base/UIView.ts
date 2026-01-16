import { UIObject } from "./UIObject";
import * as THREE from "three";
export class UIView extends UIObject {
    mesh: THREE.Mesh;
    cornerRadius: number;
    constructor(bounds: { x: number; y: number; width: number; height: number }, roundCorner: number = 7) {
        super();

        const geometry = this.roundedPlaneGeometry(bounds.width, bounds.height, roundCorner);
        // const material = new THREE.MeshPhysicalMaterial({
        //     transmission: 1.0, // Fully transparent to the background capture
        //     roughness: 0.3,    // Controls the amount of blur (0 is clear, 1 is very blurred)
        //     thickness: 1.7,    // Required for roughness to take effect
        //     ior: 1.5,          // Index of refraction
        // })
        const material = new THREE.MeshBasicMaterial({ color: 0x222222, opacity: 0.6, transparent: true });

        this.cornerRadius = roundCorner;
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
        this.mesh.position.set(bounds.x, -bounds.height / 2 + bounds.y, 0);

        this.bounds = { max: { x: bounds.width / 2, y: bounds.height / 2 }, min: { x: -bounds.width / 2, y: -bounds.height / 2 } }
        this.size = { width: bounds.width, height: bounds.height };
    }

    setTexture(texture: THREE.Texture): void {
        const material = this.mesh.material as THREE.MeshBasicMaterial;
        material.map = texture;
        material.needsUpdate = true;
    }

    setSize(size: { width: number; height: number }): void {
        this.size = size;
        this.bounds = { max: { x: size.width / 2, y: size.height / 2 }, min: { x: -size.width / 2, y: -size.height / 2 } }
        this.mesh.geometry.dispose();
        const geometry = this.roundedPlaneGeometry(size.width, size.height, this.cornerRadius);
        this.mesh.geometry = geometry;
        this.mesh.position.set(this.mesh.position.x, - size.height / 2, 0);
    }

    setOpacity(opacity: number): void {
        const material = this.mesh.material as THREE.MeshPhysicalMaterial;
        material.opacity = opacity;
        material.transparent = opacity < 1.0;
        material.needsUpdate = true;
    }

}