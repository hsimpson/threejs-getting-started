import { AmbientLight, DirectionalLight } from '/node_modules/three/build/three.module.js';

import { getGUI } from '../systems/gui.js';

const lightSettings = {
  ambientColor: '#dedea9',
  directionalColor: '#ffffff',
  directionalIntensity: 2,
};

export function createLights(scene, shadow) {
  // ambient light
  const ambientLight = new AmbientLight(lightSettings.ambientColor);

  // directional Light
  const directionalLight = new DirectionalLight(lightSettings.directionalColor, lightSettings.directionalIntensity);
  directionalLight.position.set(-10, 10, -2);

  if (shadow) {
    directionalLight.castShadow = true; // default false
    //Set up shadow properties for the light
    directionalLight.shadow.mapSize.width = 2048; // default
    directionalLight.shadow.mapSize.height = 2048; // default
    directionalLight.shadow.camera.near = 0.1; // default
    directionalLight.shadow.camera.far = 1000; // default
  }

  // add them to the scene
  scene.add(ambientLight);
  scene.add(directionalLight);

  const gui = getGUI();
  if (gui) {
    const lightsGui = gui.addFolder('Lights');
    const ambientGui = lightsGui.addFolder('Ambient');
    const directionalGui = lightsGui.addFolder('Directional');

    ambientGui.addColor(lightSettings, 'ambientColor').onChange((color) => {
      ambientLight.color.set(color);
    });
    ambientGui.add(ambientLight, 'intensity', 0, 10);

    directionalGui.addColor(lightSettings, 'directionalColor').onChange((color) => {
      directionalLight.color.set(color);
    });
    directionalGui.add(directionalLight, 'intensity', 0, 10);
  }
}
