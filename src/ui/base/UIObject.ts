import { SceneObject } from '@objects/SceneObject'
import * as THREE from 'three'

export type direction = 'up' | 'down' | 'left' | 'right'
export type arrows = 'both' | 'start' | 'end'

export class UIObject extends SceneObject {
    isHovered: boolean = false

    bounds: { min: { x: number, y: number }, max: { x: number, y: number } } = { min: { x: -50, y: -50 }, max: { x: 50, y: 50 } }
    size: { width: number, height: number } = { width: 100, height: 100 }

    uiChildren: UIObject[] = []

    update(dt: number) {
        super.update(dt)
    }
    onHover() { }
    onBlur() { }
    onPress() { }
    constructor() {
        super()
    }

    add(object: THREE.Object3D): this {
        super.add(object)
        return this
    }

    addUI(object: UIObject): this {
        super.add(object)
        this.uiChildren.push(object)
        return this
    }

    setSize(size: { width: number, height: number }): void {
        this.size = size;
        this.bounds = { max: { x: size.width / 2, y: size.height / 2 }, min: { x: -size.width / 2, y: -size.height / 2 } }
    }

    roundedPlaneGeometry(width: number, height: number, radius: number) {
        const shape = new THREE.Shape();

        const x = -width / 2;
        const y = -height / 2;
        shape.moveTo(x, y + radius);
        shape.lineTo(x, y + height - radius);
        shape.absarc(x + radius, y + height - radius, radius, Math.PI, Math.PI / 2, true);
        shape.lineTo(x + width - radius, y + height);
        shape.absarc(x + width - radius, y + height - radius, radius, Math.PI / 2, 0, true);
        shape.lineTo(x + width, y + radius);
        shape.absarc(x + width - radius, y + radius, radius, 0, -Math.PI / 2, true);
        shape.lineTo(x + radius, y);
        shape.absarc(x + radius, y + radius, radius, -Math.PI / 2, -Math.PI, true);

        this.bounds = { min: { x: x, y: y }, max: { x: x + width, y: y + height } }
        this.size = { width: width, height: height }

        return new THREE.ShapeGeometry(shape);
    }

    roundedDiamondGeometry(width: number, height: number, radius: number) {
        const shape = new THREE.Shape();

        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const top = new THREE.Vector2(0, halfHeight); // 위쪽
        const right = new THREE.Vector2(halfWidth, 0); // 오른쪽
        const bottom = new THREE.Vector2(0, -halfHeight); // 아래쪽
        const left = new THREE.Vector2(-halfWidth, 0); // 왼쪽

        shape.moveTo(top.x, top.y - radius);

        shape.absarc(top.x + radius, top.y - radius, radius, Math.PI, Math.PI / 2, true);

        shape.lineTo(right.x - radius, right.y);
        shape.absarc(right.x - radius, right.y - radius, radius, Math.PI / 2, 0, true);

        shape.lineTo(bottom.x, bottom.y + radius);
        shape.absarc(bottom.x - radius, bottom.y + radius, radius, 0, -Math.PI / 2, true);

        shape.lineTo(left.x + radius, left.y);
        shape.absarc(left.x + radius, left.y + radius, radius, -Math.PI / 2, -Math.PI, true);

        shape.lineTo(top.x, top.y - radius);

        this.bounds = { min: { x: -halfWidth, y: -halfHeight }, max: { x: halfWidth, y: halfHeight } };
        this.size = { width: width, height: height };

        return new THREE.ShapeGeometry(shape);
    }

    roundedLineGeometry(paths: { x: number; y: number }[], weight: number, radius: number): THREE.ExtrudeGeometry {
        if (paths.length < 2) {
            throw new Error("Paths must contain at least two points.");
        }

        const shape = new THREE.Shape();
        const halfWeight = weight / 2;

        const start = paths[0];
        shape.moveTo(start.x, start.y);

        for (let i = 1; i < paths.length; i++) {
            const current = paths[i];
            const previous = paths[i - 1];

            if (i < paths.length - 1) {
                const next = paths[i + 1];

                const prevDir = new THREE.Vector2(previous.x - current.x, previous.y - current.y).normalize();
                const nextDir = new THREE.Vector2(next.x - current.x, next.y - current.y).normalize();

                const cornerCenter = new THREE.Vector2(
                    current.x + prevDir.x * radius,
                    current.y + prevDir.y * radius
                );

                const cornerStart = new THREE.Vector2(
                    current.x + prevDir.x * radius,
                    current.y + prevDir.y * radius
                );
                const cornerEnd = new THREE.Vector2(
                    current.x + nextDir.x * radius,
                    current.y + nextDir.y * radius
                );

                shape.lineTo(cornerStart.x, cornerStart.y);
                shape.absarc(cornerCenter.x, cornerCenter.y, radius, prevDir.angle(), nextDir.angle(), false);
                shape.lineTo(cornerEnd.x, cornerEnd.y);
            } else {
                shape.lineTo(current.x, current.y);
            }
        }

        return new THREE.ExtrudeGeometry(shape, {
            depth: halfWeight,
            bevelEnabled: false,
        });
    }

    roundedTriangleGeometry(width: number, height: number, radius: number, direction: direction): THREE.ShapeGeometry {
        const shape = new THREE.Shape();

        // 삼각형의 꼭짓점 좌표 계산
        const halfWidth = width / 2;
        const top = new THREE.Vector2(0, height / 2); // 중심 꼭짓점
        const bottomLeft = new THREE.Vector2(-halfWidth, -height / 2); // 왼쪽 아래 꼭짓점
        const bottomRight = new THREE.Vector2(halfWidth, -height / 2); // 오른쪽 아래 꼭짓점

        // 방향에 따라 삼각형 회전
        const rotatePoint = (point: THREE.Vector2, angle: number) => {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return new THREE.Vector2(
                point.x * cos - point.y * sin,
                point.x * sin + point.y * cos
            );
        };

        let rotationAngle = 0;
        switch (direction) {
            case "up":
                rotationAngle = 0;
                break;
            case "down":
                rotationAngle = Math.PI;
                break;
            case "left":
                rotationAngle = Math.PI / 2;
                break;
            case "right":
                rotationAngle = -Math.PI / 2;
                break;
        }

        // 회전 적용
        const rotatedTop = rotatePoint(top, rotationAngle);
        const rotatedBottomLeft = rotatePoint(bottomLeft, rotationAngle);
        const rotatedBottomRight = rotatePoint(bottomRight, rotationAngle);

        // 삼각형 경로 생성
        shape.moveTo(rotatedTop.x, rotatedTop.y - radius); // 중심 꼭짓점에서 시작
        shape.absarc(rotatedTop.x, rotatedTop.y - radius, radius, Math.PI, Math.PI / 2, true); // 중심 꼭짓점 라운드 처리

        shape.lineTo(rotatedBottomRight.x - radius, rotatedBottomRight.y); // 오른쪽 아래로 이동
        shape.absarc(rotatedBottomRight.x - radius, rotatedBottomRight.y + radius, radius, Math.PI / 2, 0, true); // 오른쪽 아래 꼭짓점 라운드 처리

        shape.lineTo(rotatedBottomLeft.x + radius, rotatedBottomLeft.y); // 왼쪽 아래로 이동
        shape.absarc(rotatedBottomLeft.x + radius, rotatedBottomLeft.y + radius, radius, 0, -Math.PI / 2, true); // 왼쪽 아래 꼭짓점 라운드 처리

        shape.lineTo(rotatedTop.x, rotatedTop.y - radius); // 시작점으로 돌아감

        return new THREE.ShapeGeometry(shape);
    }

    roundedArrowGeometry(
        paths: { x: number; y: number }[],
        weight: number,
        radius: number,
        arrows: arrows
    ): THREE.Group {
        if (paths.length < 2) {
            throw new Error("Paths must contain at least two points.");
        }

        const group = new THREE.Group();

        // 1. 라운드 라인 생성
        const lineGeometry = this.roundedLineGeometry(paths, weight, radius);
        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // 기본 검정색
        const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);
        group.add(lineMesh);

        // 2. 화살표 추가
        const arrowWidth = weight * 2; // 화살표의 너비 (라인 두께의 2배)
        const arrowHeight = weight * 3; // 화살표의 높이 (라인 두께의 3배)

        // 화살표 방향 계산 함수
        const calculateDirection = (from: { x: number; y: number }, to: { x: number; y: number }): direction => {
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const angle = Math.atan2(dy, dx);

            if (Math.abs(angle) < Math.PI / 4) return "right";
            if (Math.abs(angle) > (3 * Math.PI) / 4) return "left";
            return dy > 0 ? "up" : "down";
        };

        // 시작 화살표
        if (arrows === "both" || arrows === "start") {
            const startDirection = calculateDirection(paths[1], paths[0]); // 시작점 방향
            const startArrowGeometry = this.roundedTriangleGeometry(arrowWidth, arrowHeight, radius, startDirection);
            const startArrowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const startArrowMesh = new THREE.Mesh(startArrowGeometry, startArrowMaterial);

            // 시작 화살표 위치 설정
            const start = paths[0];
            startArrowMesh.position.set(start.x, start.y, 0);
            group.add(startArrowMesh);
        }

        // 끝 화살표
        if (arrows === "both" || arrows === "end") {
            const endDirection = calculateDirection(paths[paths.length - 2], paths[paths.length - 1]); // 끝점 방향
            const endArrowGeometry = this.roundedTriangleGeometry(arrowWidth, arrowHeight, radius, endDirection);
            const endArrowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const endArrowMesh = new THREE.Mesh(endArrowGeometry, endArrowMaterial);

            // 끝 화살표 위치 설정
            const end = paths[paths.length - 1];
            endArrowMesh.position.set(end.x, end.y, 0);
            group.add(endArrowMesh);
        }

        return group;
    }
}