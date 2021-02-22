import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from '/node_modules/three/build/three.module.js';

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
      const action = mixer.clipAction(gltf.animations[1]);
      action.play();

      mixer.onUpdate = (delta) => {
        mixer.update(delta);
      };
      loop.updatables.push(mixer);
    }

    scene.add(gltf.scene);
  });
}
