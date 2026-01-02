import * as THREE from 'three'

export class Camera {
    private camera: THREE.OrthographicCamera
    private BASE_WIDTH = 500
    private BASE_HEIGHT = 500

    constructor() {
        const width = window.innerWidth
        const height = window.innerHeight
        const camera = new THREE.OrthographicCamera(
            -width / 2, width / 2,
            height / 2, -height / 2,
            -1000, 1000
        )

        camera.position.set(0, 0, 10)
        camera.lookAt(0, 0, 0)
        this.camera = camera
        Camera._camera = camera
    }

    get self() {
        return this.camera
    }
    
    private static _camera?: THREE.OrthographicCamera 
    static get bounds () {
        if (!Camera._camera) return { left: -50, right: 50, top: 50, bottom: -50}
        return {left: Camera._camera.left, right: Camera._camera.right, top: Camera._camera.top, bottom: Camera._camera.bottom}
    }
    static get size () {
        if (!Camera._camera) return { width: 100, height: 100 }
        return { width: this.bounds.right - this.bounds.left, height: this.bounds.top - this.bounds.bottom }
    }
    static getMouseWorldPosition(event: PointerEvent): THREE.Vector3 {
        if (!Camera._camera) return new THREE.Vector3(0, 0, 0)

        const mouseNDC = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            - (event.clientY / window.innerHeight) * 2 + 1
        )

        const mouseWorldPos = new THREE.Vector3()
        mouseWorldPos.x = mouseNDC.x * (Camera._camera.right - Camera._camera.left) / 2
        mouseWorldPos.y = mouseNDC.y * (Camera._camera.top - Camera._camera.bottom) / 2
        mouseWorldPos.z = 0

        return mouseWorldPos
    }

    updateOrthoCamera(
        width: number,
        height: number
    ): void {
        console.log('Camera updateOrthoCamera called')
        const aspect = width / height
        const baseAspect = this.BASE_WIDTH / this.BASE_HEIGHT

        if (aspect >= baseAspect) {
            const viewHeight = this.BASE_HEIGHT
            const viewWidth = viewHeight * aspect

            this.camera.top = viewHeight / 2
            this.camera.bottom = -viewHeight / 2
            this.camera.left = -viewWidth / 2
            this.camera.right = viewWidth / 2
        } else {
            const viewWidth = this.BASE_WIDTH
            const viewHeight = viewWidth / aspect

            this.camera.left = -viewWidth / 2
            this.camera.right = viewWidth / 2
            this.camera.top = viewHeight / 2
            this.camera.bottom = -viewHeight / 2
        }
        this.camera.updateProjectionMatrix()
    }
}