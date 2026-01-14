import { EventManager } from "../../event/EventManager";
import { UIObject } from "./UIObject";
import * as THREE from "three";
import { UIStackView } from "./UIStackView";

export class UIScrollView extends UIObject {
    contentView: UIContentView

    constructor(bounds: { x: number; y: number; width: number; height: number }) {
        super();
        const view = new UIContentView(this, { x: 0, y: 0, width: bounds.width, height: bounds.height })
        this.add(view);
        this.contentView = view;
        this.bounds = { min: { x: bounds.x, y: bounds.y }, max: { x: bounds.x + bounds.width, y: bounds.y + bounds.height } };
        this.size = { width: bounds.width, height: bounds.height };
    }

    update(dt: number): void {
        this.contentView.update(dt);
    }

    setSize(size: { width: number; height: number }) {
        this.size = size;
        this.contentView.setSize({ width: size.width, height: size.height });
    }

    scrollTo(y: number) {
        this.contentView.position.y = -(this.contentView.size.height - this.size.height) / 2 + y;
    }

    addStack(object: UIObject): this {
        this.contentView.addStack(object);
        return this;
    }

    clearStack(): this {
        this.contentView.clearStack();
        return this;
    }
}

export class UIContentView extends UIObject {

    private scrollView: UIScrollView;
    private stack: UIStackView;
    private mesh: THREE.Mesh;

    velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    acceleration: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    private dragStartPosition: THREE.Vector2 | null = null;
    private fraction = 0.9;
    private forceFactor = 100

    constructor(parent: UIScrollView, bounds: { x: number; y: number; width: number; height: number }) {
        
        super();
        this.scrollView = parent;
        this.bounds = { min: { x: bounds.x, y: bounds.y }, max: { x: bounds.x + bounds.width, y: bounds.y + bounds.height } };
        this.size = { width: bounds.width, height: bounds.height };
        const material = new THREE.MeshPhysicalMaterial({
            transmission: 1.0,
            roughness: 0.5,
            thickness: 1.7,
            ior: 1.5
        })

        const stackGeometry = this.roundedPlaneGeometry(bounds.width, bounds.height, 10);
        const stackMesh = new THREE.Mesh(stackGeometry, material);
        const stack = new UIStackView({ axis: 'vertical', spacing: 0 });

        stack.add(stackMesh);
        this.add(stack);
        this.stack = stack;
        this.mesh = stackMesh;

        EventManager.self.addPointerDownListener((event) => {
            if (!this.visibleGlobally) return;
            this.dragStartPosition = new THREE.Vector2(event.clientX, event.clientY);
        });

        EventManager.self.addPointerMoveListener((event) => {
            if (!this.visibleGlobally) return;
            if (this.dragStartPosition) {
                const deltaY = event.clientY - this.dragStartPosition.y;
                this.position.y -= deltaY;
                this.dragStartPosition.set(event.clientX, event.clientY);
                this.applyForce(new THREE.Vector3(0, -deltaY * this.forceFactor, 0));
            }
        });

        EventManager.self.addPointerUpListener(() => {
            if (!this.visibleGlobally) return;
            this.dragStartPosition = null;
            // this.setSize(this.size);
        });
    }

    addStack(object: UIObject): this {
        this.stack.addStack(object);
        return this;
    }

    clearStack(): this {
        this.stack.clearStack();
        return this;
    }

    setSize(size: { width: number; height: number }) {

        this.stack.size.width = size.width;
        this.stack.updateLayout()
        this.size.height = this.stack.size.height;

        this.mesh.geometry.dispose();
        const geometry = this.roundedPlaneGeometry(size.width, this.stack.size.height, 10);
        this.mesh.geometry = geometry;

        this.dragStartPosition = null;
    }

    applyForce(force: THREE.Vector3) {
        this.acceleration.add(force);
    }

    update(dt: number): void {
        super.update(dt);

        this.velocity.add(this.acceleration.clone().multiplyScalar(dt));
        this.position.add(this.velocity.clone().multiplyScalar(dt));

        this.acceleration.multiplyScalar(0);
        this.velocity.multiplyScalar(this.fraction);

        if (EventManager.self.pointerPressed) return;
        if (this.position.x < 0) {
            this.position.lerp(new THREE.Vector3(0, this.position.y, this.position.z), 0.25);
        }
        if (this.position.x > 0) {
            this.position.lerp(new THREE.Vector3(0, this.position.y, this.position.z), 0.25);
        }
        if (this.position.y < -(this.size.height - this.scrollView.size.height) / 2) {
            this.position.lerp(new THREE.Vector3(this.position.x, -(this.size.height - this.scrollView.size.height) / 2, this.position.z), 0.25);
        }
        if (this.position.y > (this.size.height - this.scrollView.size.height) / 2) {
            this.position.lerp(new THREE.Vector3(this.position.x, (this.size.height - this.scrollView.size.height) / 2, this.position.z), 0.25);
        }
    }
}