import { AmbientLight, DirectionalLight } from 'https://unpkg.com/three/build/three.module.js';

const lightSettings = {
  ambientColor: '#dedea9',
  directionalColor: '#ffffff',
};

export function createLights(scene, shadow, gui) {
  // ambient light
  const ambientLight = new AmbientLight(lightSettings.ambientColor);

  // directional Light
  const directionalLight = new DirectionalLight(lightSettings.directionalColor, 2);
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

  gui.addColor(lightSettings, 'ambientColor').onChange((color) => {
    ambientLight.color.set(color);
  });

  gui.addColor(lightSettings, 'directionalColor').onChange((color) => {
    directionalLight.color.set(color);
  });
}
