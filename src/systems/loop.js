import { Clock } from 'https://unpkg.com/three/build/three.module.js';
import { resizer } from './resizer.js';

import Stats from 'https://unpkg.com/three/examples/jsm/libs/stats.module.js';

export class Loop {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.updatables = [];
    this.clock = new Clock();
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  start() {
    // resizer
    resizer(document.body, (width, height) => {
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });

    this.stats.showPanel(1);
    this.renderer.setAnimationLoop(() => {
      this.stats.begin();
      this.animate();
      // render frame
      this.renderer.render(this.scene, this.camera);
      this.stats.end();
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
      if (object.onUpdate) {
        object.onUpdate(delta);
      }
    }
  }
}
