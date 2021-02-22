import { VRButton } from '/node_modules/three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from '/node_modules/three/examples/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from '/node_modules/three/examples/jsm/webxr/XRHandModelFactory.js';
import { BufferGeometry, Vector3, Line, Matrix4, Raycaster } from '/node_modules/three/build/three.module.js';

export function createXR(renderer, scene) {
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));

  // controllers

  const controller1 = renderer.xr.getController(0);
  scene.add(controller1);

  const controller2 = renderer.xr.getController(1);
  scene.add(controller2);

  const controllerModelFactory = new XRControllerModelFactory();
  const handModelFactory = new XRHandModelFactory().setPath('assets/models/OculusController/');

  // Hand 1
  const controllerGrip1 = renderer.xr.getControllerGrip(0);
  controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
  scene.add(controllerGrip1);

  const hand1 = renderer.xr.getHand(0);
  hand1.add(handModelFactory.createHandModel(hand1));

  scene.add(hand1);

  // Hand 2
  const controllerGrip2 = renderer.xr.getControllerGrip(1);
  controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
  scene.add(controllerGrip2);

  const hand2 = renderer.xr.getHand(1);
  hand2.add(handModelFactory.createHandModel(hand2));
  scene.add(hand2);

  // line for picking
  const geometry = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, -1)]);

  const line = new Line(geometry);
  line.name = 'line';
  line.scale.z = 5;

  controller1.add(line.clone());
  controller2.add(line.clone());

  const intersected = [];
  const tempMatrix = new Matrix4();
  const raycaster = new Raycaster();

  const cleanIntersected = () => {
    while (intersected.length) {
      const object = intersected.pop();
      object.material.emissive.r = 0;
    }
  };

  const getIntersections = (controller) => {
    tempMatrix.identity().extractRotation(controller.matrixWorld);

    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    return raycaster.intersectObjects(scene.children);
  };

  const intersectObjects = (controller) => {
    // Do not highlight when already selected

    if (controller.userData.selected !== undefined) return;

    const line = controller.getObjectByName('line');
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
      const intersection = intersections[0];

      const object = intersection.object;
      object.material.emissive.r = 1;
      intersected.push(object);

      line.scale.z = intersection.distance;
    } else {
      line.scale.z = 5;
    }
  };

  return () => {
    cleanIntersected();

    intersectObjects(controller1);
    intersectObjects(controller2);
  };
}
