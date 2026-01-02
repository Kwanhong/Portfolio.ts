import * as THREE from 'three'
import { Time } from './Time'
import { Input } from './Input'
import { SceneManager } from '../scene/SceneManager'
// import { PhysicsWorld } from '../physics/PhysicsWorld'

export class Engine {
    renderer: THREE.WebGLRenderer
    time = new Time()
    input: Input
    sceneManager: SceneManager
    // physics: PhysicsWorld

    constructor() {
        console.log('ENGINE START')

        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            powerPreference: 'high-performance'
        })

        console.log('RENDERER OK')

        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        // document.body.requestFullscreen();
        const canvas = this.renderer.domElement

        document.body.appendChild(canvas)
        console.log('SIZE SET')

        this.input = new Input(canvas)
        console.log('INPUT OK')

        this.sceneManager = new SceneManager()
        console.log('SCENE OK')

        // this.physics = new PhysicsWorld()
        // console.log('PHYSICS OK')

        window.addEventListener('resize', () => this.onWindowResize())

        this.loop()
        this.onWindowResize()
    }

    loop() {
        requestAnimationFrame(() => this.loop())
        this.time.update()
        this.input.update()
        // this.physics.update(this.time.deltaTime)
        this.sceneManager.update(this.time.deltaTime)
        this.renderer.render(
            this.sceneManager.mother,
            this.sceneManager.camera.self
        )
    }

    onWindowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.sceneManager.onWindowResize()
    }
}