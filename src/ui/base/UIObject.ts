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

    roundedPlaneGeometry(width: number, height: number, radius: number): THREE.ShapeGeometry {
        const shape = new THREE.Shape();

        const x = -width / 2;
        const y = -height / 2;

        // 라운드된 사각형 경로 생성
        shape.moveTo(x, y + radius);
        shape.lineTo(x, y + height - radius);
        shape.absarc(x + radius, y + height - radius, radius, Math.PI, Math.PI / 2, true);
        shape.lineTo(x + width - radius, y + height);
        shape.absarc(x + width - radius, y + height - radius, radius, Math.PI / 2, 0, true);
        shape.lineTo(x + width, y + radius);
        shape.absarc(x + width - radius, y + radius, radius, 0, -Math.PI / 2, true);
        shape.lineTo(x + radius, y);
        shape.absarc(x + radius, y + radius, radius, -Math.PI / 2, -Math.PI, true);

        // ShapeGeometry 생성
        const geometry = new THREE.ShapeGeometry(shape);

        // UV 좌표 설정
        geometry.computeBoundingBox();
        const { min, max } = geometry.boundingBox!;
        const range = new THREE.Vector2(max.x - min.x, max.y - min.y);

        geometry.attributes.position.array.forEach((_, i) => {
            if (i % 3 === 0) {
                const x = geometry.attributes.position.array[i];
                const y = geometry.attributes.position.array[i + 1];
                const u = (x - min.x) / range.x;
                const v = (y - min.y) / range.y;
                geometry.attributes.uv.setXY(i / 3, u, v);
            }
        });

        return geometry;
    }

    roundedLineGeometry(
        paths: { x: number; y: number }[],
        weight: number
    ): THREE.ShapeGeometry {
        return new THREE.ShapeGeometry(this.roundedLineShape(paths, weight));
    }

    roundedLineShape(
        paths: { x: number; y: number }[],
        weight: number,
        original: THREE.Shape | undefined = undefined
    ): THREE.Shape {
        
        if (paths.length < 2) {
            throw new Error("paths must have at least 2 points");
        }

        const halfWeight = weight / 2;
        const shape = original || new THREE.Shape();

        // 방향 벡터 계산 (정규화)
        const getDir = (from: { x: number; y: number }, to: { x: number; y: number }) => {
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            return { x: dx / len, y: dy / len };
        };

        // 각 세그먼트의 방향 벡터
        const dirs: { x: number; y: number }[] = [];
        for (let i = 0; i < paths.length - 1; i++) {
            dirs.push(getDir(paths[i], paths[i + 1]));
        }

        // perpendicular
        const perpLeft = (dir: { x: number; y: number }) => ({ x: -dir.y, y: dir.x });
        const perpRight = (dir: { x: number; y: number }) => ({ x: dir.y, y: -dir.x });

        // 왼쪽 점들과 오른쪽 점들 계산
        const leftPoints: { x: number; y: number }[] = [];
        const rightPoints: { x: number; y: number }[] = [];

        for (let i = 0; i < paths.length; i++) {
            if (i === 0) {
                // 시작점
                const pL = perpLeft(dirs[0]);
                const pR = perpRight(dirs[0]);
                leftPoints.push({ x: paths[i].x + pL.x * halfWeight, y: paths[i].y + pL.y * halfWeight });
                rightPoints.push({ x: paths[i].x + pR.x * halfWeight, y: paths[i].y + pR.y * halfWeight });
            } else if (i === paths.length - 1) {
                // 끝점
                const pL = perpLeft(dirs[i - 1]);
                const pR = perpRight(dirs[i - 1]);
                leftPoints.push({ x: paths[i].x + pL.x * halfWeight, y: paths[i].y + pL.y * halfWeight });
                rightPoints.push({ x: paths[i].x + pR.x * halfWeight, y: paths[i].y + pR.y * halfWeight });
            } else {
                // 중간점 - 두 세그먼트의 교차점 계산
                const pL1 = perpLeft(dirs[i - 1]);
                const pL2 = perpLeft(dirs[i]);
                const pR1 = perpRight(dirs[i - 1]);
                const pR2 = perpRight(dirs[i]);

                // 간단히 평균 사용 (miter 방식)
                const avgL = { x: (pL1.x + pL2.x) / 2, y: (pL1.y + pL2.y) / 2 };
                const avgR = { x: (pR1.x + pR2.x) / 2, y: (pR1.y + pR2.y) / 2 };
                const lenL = Math.sqrt(avgL.x * avgL.x + avgL.y * avgL.y) || 1;
                const lenR = Math.sqrt(avgR.x * avgR.x + avgR.y * avgR.y) || 1;

                const dot = dirs[i - 1].x * dirs[i].x + dirs[i - 1].y * dirs[i].y;
                const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
                let miterLen = halfWeight / Math.cos(angle / 2);
                miterLen = Math.min(miterLen, halfWeight * 3);

                leftPoints.push({
                    x: paths[i].x + (avgL.x / lenL) * miterLen,
                    y: paths[i].y + (avgL.y / lenL) * miterLen
                });
                rightPoints.push({
                    x: paths[i].x + (avgR.x / lenR) * miterLen,
                    y: paths[i].y + (avgR.y / lenR) * miterLen
                });
            }
        }

        // Shape 그리기: 오른쪽 시작 -> 반원 -> 왼쪽으로 -> 끝점 -> 오른쪽으로 돌아오기
        shape.moveTo(rightPoints[0].x, rightPoints[0].y);

        // 시작점 반원 (오른쪽 → 왼쪽)
        const pR0 = perpRight(dirs[0]);
        const startAngle = Math.atan2(pR0.y, pR0.x);
        shape.absarc(paths[0].x, paths[0].y, halfWeight, startAngle, startAngle + Math.PI, true);

        // 왼쪽 라인 (시작 -> 끝) - 첫 점은 arc에서 이미 그렸으므로 1부터
        for (let i = 1; i < leftPoints.length; i++) {
            // shape.lineTo(leftPoints[i].x, leftPoints[i].y);
            // continue;
            // 중간 점에서 모서리 라운딩 체크 (마지막 점 제외)
            if (i < leftPoints.length - 1) {
                const cross = dirs[i - 1].x * dirs[i].y - dirs[i - 1].y * dirs[i].x;
                if (cross < 0) {
                    // 왼쪽 턴: 왼쪽 라인이 바깥쪽 → arc 추가
                    const pL1 = perpLeft(dirs[i - 1]);
                    const pL2 = perpLeft(dirs[i]);
                    const a1 = Math.atan2(pL1.y, pL1.x);
                    const a2 = Math.atan2(pL2.y, pL2.x);
                    shape.absarc(paths[i].x, paths[i].y, halfWeight, a1, a2, true);
                } else {
                    // 오른쪽 턴: 왼쪽 라인이 안쪽 → lineTo
                    shape.lineTo(leftPoints[i].x, leftPoints[i].y);
                }
            } else {
                shape.lineTo(leftPoints[i].x, leftPoints[i].y);
            }
        }

        // 끝점 반원 (왼쪽 → 오른쪽)
        const pLEnd = perpLeft(dirs[dirs.length - 1]);
        const endAngle = Math.atan2(pLEnd.y, pLEnd.x);
        shape.absarc(paths[paths.length - 1].x, paths[paths.length - 1].y, halfWeight, endAngle, endAngle + Math.PI, true);

        // 오른쪽 라인 (끝 -> 시작, 역순) - 끝점은 arc에서 이미 그렸으므로 length-2부터, 시작점은 closePath로 처리되므로 1까지
        for (let i = rightPoints.length - 2; i >= 1; i--) {
            // shape.lineTo(rightPoints[i].x, rightPoints[i].y);
            // continue;
            // 중간 점에서 모서리 라운딩 체크 (시작점 제외)
            if (i > 0) {
                const cross = dirs[i - 1].x * dirs[i].y - dirs[i - 1].y * dirs[i].x;
                if (cross > 0) {
                    // 오른쪽 턴: 오른쪽 라인이 바깥쪽 → arc 추가
                    const pR2 = perpRight(dirs[i]);
                    const pR1 = perpRight(dirs[i - 1]);
                    const a1 = Math.atan2(pR2.y, pR2.x);
                    const a2 = Math.atan2(pR1.y, pR1.x);
                    shape.absarc(paths[i].x, paths[i].y, halfWeight, a1, a2, true);
                } else {
                    // 왼쪽 턴: 오른쪽 라인이 안쪽 → lineTo
                    shape.lineTo(rightPoints[i].x, rightPoints[i].y);
                }
            } else {
                shape.lineTo(rightPoints[i].x, rightPoints[i].y);
            }
        }

        shape.closePath();
        return shape;
    }

    singleLineGreometry(start: {x: number, y: number}, end: {x: number, y: number}, weight: number) {
        const shape = new THREE.Shape()
        const dir = { x: end.x - start.x, y: end.y - start.y }
        const len = Math.sqrt(dir.x * dir.x + dir.y * dir.y)
        dir.x /= len
        dir.y /= len

        const perp = (dir: { x: number; y: number }) => ({ x: -dir.y, y: dir.x });
        const p = perp(dir)
        const halfWeight = weight / 2

        const leftStart = { x: start.x + p.x * halfWeight, y: start.y + p.y * halfWeight }
        const rightStart = { x: start.x - p.x * halfWeight, y: start.y - p.y * halfWeight }
        const leftEnd = { x: end.x + p.x * halfWeight, y: end.y + p.y * halfWeight }
        const rightEnd = { x: end.x - p.x * halfWeight, y: end.y - p.y * halfWeight }

        shape.moveTo(leftStart.x, leftStart.y)
        shape.lineTo(leftEnd.x, leftEnd.y)
        shape.lineTo(rightEnd.x, rightEnd.y)
        shape.lineTo(rightStart.x, rightStart.y)
        shape.closePath()

        return new THREE.ShapeGeometry(shape)
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
        const lineGeometry = this.roundedLineGeometry(paths, weight);
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