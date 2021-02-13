import { WebGLRenderer, PCFSoftShadowMap, sRGBEncoding } from 'https://unpkg.com/three/build/three.module.js';

export function createRenderer(shadow) {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = sRGBEncoding;

  if (shadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
  }

  return renderer;
}
