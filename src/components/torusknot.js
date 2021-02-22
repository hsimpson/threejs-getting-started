import {
  TorusKnotGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  MathUtils,
} from '/node_modules/three/build/three.module.js';

import { getGUI } from '../systems/gui.js';

const materialSettings = {
  color: '#0134e6',
  metalness: 0.0,
  roughness: 0.1,
};

export function createTorusKnot(scene, shadow) {
  const geometry = new TorusKnotGeometry(0.5, 0.2, 128, 32);
  // const material = new MeshBasicMaterial({ color: materialSettings.color });
  const material = new MeshStandardMaterial(materialSettings);

  // create a cube mesh and use geometry and material
  const mesh = new Mesh(geometry, material);

  if (shadow) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }

  //move right and up by 1 units
  mesh.position.x = 1;
  mesh.position.y = 1;

  // add to the scene
  scene.add(mesh);

  const gui = getGUI();
  if (gui) {
    const torusKnotGui = gui.addFolder('Torus Knot');
    torusKnotGui.addColor(materialSettings, 'color').onChange((color) => {
      material.color.set(color);
    });
    torusKnotGui.add(material, 'metalness', 0, 1);
    torusKnotGui.add(material, 'roughness', 0, 1);
  }

  // 60° per second
  const radiansPerSecond = MathUtils.degToRad(60);
  return (delta) => {
    mesh.rotation.x -= radiansPerSecond * delta;
    mesh.rotation.y -= radiansPerSecond * delta;
    mesh.rotation.z -= radiansPerSecond * delta;
  };
}
