import {
  TorusKnotGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  MathUtils,
} from 'https://unpkg.com/three/build/three.module.js';

const materialSettings = {
  color: '#425ec2',
  metalness: 0.0,
  roughness: 0.1,
};

export function createTorusKnot(scene, shadow, gui) {
  const geometry = new TorusKnotGeometry(0.5, 0.2, 128, 32);
  // const material = new MeshBasicMaterial({ color: props.color });
  const material = new MeshStandardMaterial(materialSettings);

  // create a cube mesh and use geometry and material
  const mesh = new Mesh(geometry, material);

  if (shadow) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }

  //move right and up by 1 units
  mesh.position.x = 1;
  mesh.position.y = 1;

  // 30° per second
  const radiansPerSecond = MathUtils.degToRad(60);
  mesh.onUpdate = (delta) => {
    mesh.rotation.x -= radiansPerSecond * delta;
    mesh.rotation.y -= radiansPerSecond * delta;
    mesh.rotation.z -= radiansPerSecond * delta;
  };

  // add to the scene
  scene.add(mesh);

  gui.addColor(materialSettings, 'color').onChange((color) => {
    material.color.set(color);
  });
  gui.add(material, 'metalness', 0, 1);
  gui.add(material, 'roughness', 0, 1);

  return mesh;
}
