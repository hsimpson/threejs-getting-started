import { WebGLRenderer, PCFSoftShadowMap } from 'https://unpkg.com/three/build/three.module.js';

export function createRenderer(shadow) {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (shadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
  }

  return renderer;
}
