import { Clock } from '/node_modules/three/build/three.module.js';
import { resizer } from './resizer.js';

import Stats from '/node_modules/three/examples/jsm/libs/stats.module.js';

import { createPostProcessing } from './postprocessing.js';

export class Loop {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.updatables = [];
    this.clock = new Clock();
    // this.stats = new Stats();
    // document.body.appendChild(this.stats.dom);

    // this.composer = createPostProcessing(this.renderer, this.scene, this.camera);
  }

  start() {
    // resizer
    resizer(document.body, (width, height) => {
      this.renderer.setSize(width, height);
      if (this.composer) {
        this.composer.setSize(width, height);
      }
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });

    // this.stats.showPanel(1);
    this.renderer.setAnimationLoop(() => {
      // this.stats.begin();
      this.animate();
      // render frame
      if (this.composer) {
        this.composer.render();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
      // this.stats.end();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  animate() {
    // delta time in seconds per frame
    const delta = this.clock.getDelta();

    // call onUpdate on every object
    for (const updateFunc of this.updatables) {
      updateFunc(delta);
    }
  }
}
