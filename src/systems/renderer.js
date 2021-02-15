import {
  WebGLRenderer,
  PCFSoftShadowMap,
  sRGBEncoding,
  ReinhardToneMapping,
} from 'https://unpkg.com/three/build/three.module.js';

export function createRenderer(shadow, gui) {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = ReinhardToneMapping;
  renderer.toneMappingExposure = 0.5;

  if (shadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
  }

  if (gui) {
    gui.add(renderer, 'toneMappingExposure', 0, 5, 0.1);
  }

  return renderer;
}
