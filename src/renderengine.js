import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { createCamera } from './components/camera.js';

import { createFloor } from './components/floor.js';
import { createCube } from './components/cube.js';
import { createTorusKnot } from './components/torusknot.js';

import { resizer } from './systems/resizer.js';
import { Loop } from './systems/loop.js';
import { createControls } from './systems/controls.js';

import { createLights } from './components/lights.js';

import { GUI } from 'https://unpkg.com/three/examples/jsm/libs/dat.gui.module.js';

import { createEnvironment } from './components/environment.js';

export class RenderEngine {
  constructor(shadow) {
    // the main scene
    this.scene = createScene();

    // create a perspective camera with 45° vertical fov
    this.camera = createCamera();

    // create the renderer
    this.renderer = createRenderer(shadow);

    // add the renderer dom element (canvas) to the body
    document.body.appendChild(this.renderer.domElement);

    // create gui
    this.gui = new GUI();

    // create a floor
    createFloor(this.scene, shadow);

    // create a cube and a torus knot
    const cube = createCube(this.scene, shadow, this.gui.addFolder('Cube'));
    const torusKnot = createTorusKnot(this.scene, shadow, this.gui.addFolder('Torus knot'));

    // create the lights
    createLights(this.scene, shadow, this.gui.addFolder('Lights'));

    // resizer
    resizer(document.body, this.renderer, this.camera);

    // animation loop
    this.loop = new Loop(this.renderer, this.scene, this.camera);

    // controls
    const controls = createControls(this.camera, this.renderer.domElement);

    // adding objects to the update
    this.loop.updatables.push(cube, torusKnot);
    this.loop.updatables.push(controls);

    createEnvironment(this.renderer, this.scene);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    // this.render();
    this.loop.start();
  }
}
