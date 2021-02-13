import {
  PlaneGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
  Mesh,
  MathUtils,
} from 'https://unpkg.com/three/build/three.module.js';

export function createFloor(scene, shadow) {
  const floorGeometry = new PlaneGeometry(8, 8);

  // const floorMaterial = new MeshStandardMaterial({ color: '#ebd8be' });
  const floorMaterial = new MeshPhongMaterial({ color: '#ebd8be' });

  // create a floor mesh and use geometry and material
  const floor = new Mesh(floorGeometry, floorMaterial);

  if (shadow) {
    floor.receiveShadow = true; //default
  }

  // rotate 90° on x axis
  floor.rotateX(MathUtils.degToRad(-90));

  scene.add(floor);
}
