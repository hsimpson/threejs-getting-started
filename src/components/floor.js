import {
  PlaneGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
  Mesh,
  MathUtils,
} from '/node_modules/three/build/three.module.js';

import { createMaterial } from '../assets/materials/MetalPlates007/material.js';

export function createFloor(scene, shadow) {
  const floorGeometry = new PlaneGeometry(8, 8);

  // const material = new MeshStandardMaterial({ color: '#ebd8be' });
  // const material = new MeshPhongMaterial({ color: '#ebd8be' });

  const material = createMaterial();

  // create a floor mesh and use geometry and material
  const floor = new Mesh(floorGeometry, material);

  if (shadow) {
    floor.receiveShadow = true; //default
  }

  // rotate 90° on x axis
  floor.rotateX(MathUtils.degToRad(-90));

  scene.add(floor);
}
