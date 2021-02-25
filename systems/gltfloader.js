import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from '../three/build/three.module.js';

export function loadGLTF(url, scene, loop, scale) {
  const loader = new GLTFLoader();
  loader.load(url, (gltf) => {
    if (scale) {
      gltf.scene.scale.multiplyScalar(scale);
    }

    // turn on shadows
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // handling animations
    if (gltf.animations.length && loop) {
      const mixer = new AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();

      loop.updatables.push((delta) => {
        mixer.update(delta);
      });
    }

    scene.add(gltf.scene);
  });
}
