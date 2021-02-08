import { Clock } from 'https://unpkg.com/three/build/three.module.js';

export class Loop {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.updatables = [];
    this.clock = new Clock();
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.animate();
      // render frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  animate() {
    // delta time in seconds per frame
    const delta = this.clock.getDelta();

    // call onUpdate on every object
    for (const object of this.updatables) {
      object.onUpdate(delta);
    }
  }
}
