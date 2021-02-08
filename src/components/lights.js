import { DirectionalLight } from 'https://unpkg.com/three/build/three.module.js';

export function createLights() {
  const light = new DirectionalLight('#ffffff', 8);

  light.position.set(10, 10, 10);

  return light;
}
