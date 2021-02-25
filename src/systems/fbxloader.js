import { FBXLoader } from '../three/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer, MeshStandardMaterial } from '../three/build/three.module.js';

import { createMaterial } from '../assets/materials/3DPrinting/material.js';

export function loadFBX(url, scene, loop, scale) {
  const loader = new FBXLoader();
  loader.load(url, (fbx) => {
    if (scale) {
      fbx.scale.multiplyScalar(scale);
    }

    // const material = new MeshStandardMaterial();
    const material = createMaterial();

    // turn on shadows
    fbx.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = material;
      }
    });

    // handling animations
    if (fbx.animations.length && loop) {
      const mixer = new AnimationMixer(fbx);
      const action = mixer.clipAction(fbx.animations[0]);
      action.play();

      loop.updatables.push((delta) => {
        mixer.update(delta);
      });
    }
    scene.add(fbx);
  });
}
