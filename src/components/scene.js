import { Color, Scene } from '../three/build/three.module.js';

export function createScene() {
  const scene = new Scene();
  scene.background = new Color('#111111');

  return scene;
}
