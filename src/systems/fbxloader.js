import { FBXLoader } from 'https://unpkg.com/three/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer } from 'https://unpkg.com/three/build/three.module.js';

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

      mixer.onUpdate = (delta) => {
        mixer.update(delta);
      };
      loop.updatables.push(mixer);
    }
    scene.add(fbx);
  });
}
