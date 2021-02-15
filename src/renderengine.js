import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { createCamera } from './components/camera.js';

import { createFloor } from './components/floor.js';
import { createCube } from './components/cube.js';
import { createTorusKnot } from './components/torusknot.js';

import { Loop } from './systems/loop.js';
import { createControls } from './systems/controls.js';

import { createLights } from './components/lights.js';

import { createGUI } from './systems/gui.js';

import { createEnvironment } from './components/environment.js';

import { loadGLTF } from './systems/gltfloader.js';
import { loadFBX } from './systems/fbxloader.js';

export class RenderEngine {
  constructor(shadow) {
    // create gui
    createGUI();

    // the main scene
    this.scene = createScene();

    // create a perspective camera with 45° vertical fov
    this.camera = createCamera();

    // create the renderer
    this.renderer = createRenderer(shadow);

    // add the renderer dom element (canvas) to the body
    document.body.appendChild(this.renderer.domElement);

    // create a floor
    createFloor(this.scene, shadow);

    // create a cube and a torus knot
    const cube = createCube(this.scene, shadow);
    const torusKnot = createTorusKnot(this.scene, shadow);

    // create the lights
    createLights(this.scene, shadow);

    // animation loop
    this.loop = new Loop(this.renderer, this.scene, this.camera);

    // controls
    const controls = createControls(this.camera, this.renderer.domElement);

    // adding objects to the update
    this.loop.updatables.push(cube, torusKnot);
    this.loop.updatables.push(controls);

    createEnvironment(this.renderer, this.scene);

    // load objects
    // this.loadObjects();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    // this.render();
    this.loop.start();
  }

  loadObjects() {
    loadGLTF('assets/models/WaterBottle/WaterBottle.gltf', this.scene, null, 15);
    // loadGLTF('assets/models/Roboter/Roboter_3.gltf', this.scene, this.loop);
  }
}
