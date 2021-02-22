import { FBXLoader } from '/node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer } from '/node_modules/three/build/three.module.js';

export function loadFBX(url, scene, loop, scale) {
  const loader = new FBXLoader();
  loader.load(url, (fbx) => {
    if (scale) {
      fbx.scale.multiplyScalar(scale);
    }

    // turn on shadows
    fbx.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
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
