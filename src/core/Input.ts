import * as THREE from 'three'

export class Input {
    private mouse = new THREE.Vector2()
    private prev = new THREE.Vector2()
    private delta = new THREE.Vector2()
    down = false

    constructor(dom: HTMLCanvasElement) {
        dom.addEventListener('pointermove', e => {
        this.mouse.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )
    })

    dom.addEventListener('pointerdown', () => (this.down = true))
    dom.addEventListener('pointerup', () => (this.down = false))
  }

  update() {
    this.delta.subVectors(this.mouse, this.prev)
    this.prev.copy(this.mouse)
  }
}