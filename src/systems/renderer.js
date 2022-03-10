import { WebGLRenderer, PCFSoftShadowMap, sRGBEncoding, ReinhardToneMapping } from 'three';

import { getGUI } from './gui.js';

export function createRenderer(shadow) {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = ReinhardToneMapping;
  renderer.toneMappingExposure = 1.0;

  if (shadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
  }

  const gui = getGUI();
  if (gui) {
    const rendererGui = gui.addFolder('Renderer');
    rendererGui.add(renderer, 'toneMappingExposure', 0, 5, 0.1);
  }

  return renderer;
}
