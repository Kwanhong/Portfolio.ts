import { UIView } from "@ui/base/UIView";
import { UIObject } from "@ui/base/UIObject";
import * as THREE from "three";
import { Color } from "@data/Color";

export class BackgroundField extends UIObject {
    blobs: UIObject[] = [];
    lines: THREE.Mesh[] = [];
    constructor(size: { width: number; height: number }, resolution: number) {

        size.width = size.width + resolution * 2
        size.height = size.height + resolution * 2

        super();

        for (let x = 0; x < size.width; x += resolution) {
            for (let y = 0; y < size.height; y += resolution) {
                const blob = new UIObject();
                const radius = resolution / 8;
                const color = Color.helper.getHex('background.secondary')
                const geometry = this.roundedPlaneGeometry(radius, radius, radius / 2);
                const material = new THREE.MeshBasicMaterial({ color: color, opacity: 1, transparent: true });
                const mesh = new THREE.Mesh(geometry, material);
                blob.add(mesh);
                blob.position.x = x - size.width / 2 + resolution / 2;
                blob.position.y = y - size.height / 2 + resolution / 2;
                blob.position.z = -200;
                this.add(blob);
                this.blobs.push(blob);

                // Line 생성 (오른쪽 연결)
                if (x + resolution < size.width) {
                    const rightBlobPosition = {
                        x: x + resolution - size.width / 2 + resolution / 2,
                        y: y - size.height / 2 + resolution / 2,
                    };
                    const lineGeometry = this.roundedLineGeometry(
                        [
                            { x: blob.position.x, y: blob.position.y },
                            { x: rightBlobPosition.x, y: rightBlobPosition.y },
                        ],
                        resolution / 16
                    );

                    const lineMaterial = new THREE.MeshBasicMaterial({
                         color: color, transparent: true, opacity: 0.5
                    });
                    const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);
                    this.add(lineMesh);
                    lineMesh.position.z = -201;
                    this.lines.push(lineMesh);
                }

                // Line 생성 (아래쪽 연결)
                if (y + resolution < size.height) {
                    const bottomBlobPosition = {
                        x: x - size.width / 2 + resolution / 2,
                        y: y + resolution - size.height / 2 + resolution / 2,
                    };
                    const lineGeometry = this.roundedLineGeometry(
                        [
                            { x: blob.position.x, y: blob.position.y },
                            { x: bottomBlobPosition.x, y: bottomBlobPosition.y },
                        ],
                        resolution / 16
                    );

                    const lineMaterial = new THREE.MeshBasicMaterial({ 
                        color: color, transparent: true, opacity: 0.5 
                    });
                    const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);
                    this.add(lineMesh);
                    lineMesh.position.z = -201
                    this.lines.push(lineMesh);
                }
            }
        }
    }

    update(dt: number): void {
        super.update(dt);

        for (const line of this.lines) {
            // line.rotation.x += 0.01 * dt;
            // line.rotation.z += 0.01 * dt;
        }
    }
}  