import { Color, Scene } from 'three';

export function createScene() {
  const scene = new Scene();
  scene.background = new Color('#111111');

  return scene;
}
