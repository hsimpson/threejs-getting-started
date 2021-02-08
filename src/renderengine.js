import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createRenderer } from './systems/renderer.js';
import { createScene } from './components/scene.js';

import { resizer } from './systems/resizer.js';
import { Loop } from './systems/loop.js';

import { createLights } from './components/lights.js';

export class RenderEngine {
  constructor() {
    // the main scene
    this.scene = createScene();

    // create a perspective camera with 45° vertical fov
    this.camera = createCamera();

    // create the renderer
    this.renderer = createRenderer();

    // add the renderer dom element (canvas) to the body
    document.body.appendChild(this.renderer.domElement);

    // create a cube and add it to the scene
    const cube = createCube();
    this.scene.add(cube);

    // create a light
    const light = createLights();
    this.scene.add(light);

    // resizer
    resizer(document.body, this.renderer, this.camera);

    // animation loop
    this.loop = new Loop(this.renderer, this.scene, this.camera);
    this.loop.updatables.push(cube);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    // this.render();
    this.loop.start();
  }
}
