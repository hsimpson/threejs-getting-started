import {
  BoxGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  MathUtils,
} from 'https://unpkg.com/three/build/three.module.js';

export function createCube() {
  const cubeGeometry = new BoxGeometry(1, 1, 1);
  // const cubeMaterial = new MeshBasicMaterial({ color: '#03fc49' });
  const cubeMaterial = new MeshStandardMaterial({ color: '#03fc49' });

  // create a cube and use geometry and material
  const cube = new Mesh(cubeGeometry, cubeMaterial);

  cube.rotation.set(-0.5, -0.1, 0.8);

  // 30° per second
  const radiansPerSecond = MathUtils.degToRad(30);
  cube.onUpdate = (delta) => {
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
    cube.rotation.z += radiansPerSecond * delta;
  };

  return cube;
}
