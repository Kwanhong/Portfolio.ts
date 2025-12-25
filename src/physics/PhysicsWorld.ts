import * as RAPIER from '@dimforge/rapier3d-compat'

export class PhysicsWorld {
  world!: RAPIER.World

  private fixedTimeStep = 1 / 60
  private accumulator = 0

  async init() {
    await RAPIER.init()

    const gravity = { x: 0, y: -9.81, z: 0 }
    this.world = new RAPIER.World(gravity)
  }

  update(deltaTime: number) {
    if (!this.world) return

    this.accumulator += deltaTime

    while (this.accumulator >= this.fixedTimeStep) {
      this.world.step()
      this.accumulator -= this.fixedTimeStep
    }
  }
}