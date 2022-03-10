import { Mesh, SphereGeometry } from 'three';
import { createMaterial } from '../materials/Marble006/material.js';
import { getGUI } from '../systems/gui.js';

const materialSettings = {
  color: '#cf0e7a',
  metalness: 0.0,
  roughness: 0.1,
};

export function createSphere(scene, shadow) {
  const geometry = new SphereGeometry(0.5, 32, 32);
  // const material = new MeshBasicMaterial({ color: materialSettings.color });
  // const material = new MeshStandardMaterial(materialSettings);

  const material = createMaterial();

  // create a cube mesh and use geometry and material
  const mesh = new Mesh(geometry, material);

  if (shadow) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }

  //move up by 1 unit
  //move back by 2 unit
  mesh.position.y = 1;
  mesh.position.z = 2;

  // add to the scene
  scene.add(mesh);

  const gui = getGUI();
  if (gui) {
    const sphereGui = gui.addFolder('Sphere');
    sphereGui.addColor(materialSettings, 'color').onChange((color) => {
      material.color.set(color);
    });
    sphereGui.add(material, 'metalness', 0, 1);
    sphereGui.add(material, 'roughness', 0, 1);
  }
}
