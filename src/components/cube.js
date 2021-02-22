import {
  BoxGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  MathUtils,
} from '/node_modules/three/build/three.module.js';

import { getGUI } from '../systems/gui.js';

// import { createMaterial } from '../assets/materials/basicmaterial.js';
import { createMaterial } from '../assets/materials/checkerboardmaterial.js';

const materialSettings = {
  color: '#007818',
  metalness: 0.0,
  roughness: 0.1,
};

export function createCube(scene, shadow) {
  const geometry = new BoxGeometry(1, 1, 1);
  // const material = new MeshBasicMaterial({ color: materialSettings.color });
  const material = new MeshStandardMaterial(materialSettings);

  // const material = createMaterial();
  // const material = createMaterial({
  //   even: '#cccccc',
  //   odd: '#333333',
  //   scale: 2,
  // });

  // create a cube mesh and use geometry and material
  const mesh = new Mesh(geometry, material);

  if (shadow) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }

  //move left and up by 1 units
  mesh.position.x = -1;
  mesh.position.y = 1;

  // 30° per second
  const radiansPerSecond = MathUtils.degToRad(30);
  mesh.onUpdate = (delta) => {
    mesh.rotation.x += radiansPerSecond * delta;
    mesh.rotation.y += radiansPerSecond * delta;
    mesh.rotation.z += radiansPerSecond * delta;
  };

  // add to the scene
  scene.add(mesh);

  const gui = getGUI();
  if (gui) {
    const cubeGui = gui.addFolder('Cube');
    cubeGui.addColor(materialSettings, 'color').onChange((color) => {
      material.color.set(color);
    });
    cubeGui.add(material, 'metalness', 0, 1);
    cubeGui.add(material, 'roughness', 0, 1);
  }

  return mesh;
}
