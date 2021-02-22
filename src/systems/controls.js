import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;

  controls.onUpdate = () => {
    // update the controls
    controls.update();
  };

  return controls;
}
