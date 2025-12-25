import * as THREE from 'three'

export class Camera {
    private camera: THREE.OrthographicCamera
    private BASE_WIDTH = 800
    private BASE_HEIGHT = 600

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
    }

    get instance() {
        return this.camera
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