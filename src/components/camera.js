import { PerspectiveCamera } from 'https://unpkg.com/three/build/three.module.js';

export function createCamera() {
  // create a perspective camera with 45° vertical fov
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  // move the camera 5 units back
  camera.position.z = 5;

  return camera;
}
