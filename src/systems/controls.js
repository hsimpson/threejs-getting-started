import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;

  controls.onUpdate = () => {
    // update the controls
    controls.update();
  };

  return controls;
}
