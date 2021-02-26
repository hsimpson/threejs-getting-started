import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer, TextureLoader } from '../three/build/three.module.js';

export function loadGLTF(url, scene, loop, scale) {
  const loader = new GLTFLoader();

  const texLoader = new TextureLoader().setPath('assets/models/Roboter/');

  loader.load(url, (gltf) => {
    if (scale) {
      gltf.scene.scale.multiplyScalar(scale);
    }

    // turn on shadows
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // child.material = material;
        child.material.normalMap = undefined;
        child.material.bumpMap = texLoader.load('bump.png');
        child.material.bumpScale = 0.571429;
      }
    });

    // handling animations
    if (gltf.animations.length && loop) {
      const mixer = new AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[1]);
      action.play();

      loop.updatables.push((delta) => {
        mixer.update(delta);
      });
    }

    scene.add(gltf.scene);
  });
}
