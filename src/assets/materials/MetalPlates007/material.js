import { MeshStandardMaterial, TextureLoader, sRGBEncoding } from 'https://unpkg.com/three/build/three.module.js';

export function createMaterial() {
  const loader = new TextureLoader().setPath('assets/materials/MetalPlates007/');
  const material = new MeshStandardMaterial();
  material.metalness = 0.0;

  // diffuse map aka albedo
  const diffuseMap = loader.load('MetalPlates007_4K_Color.jpg');
  diffuseMap.encoding = sRGBEncoding;
  material.map = diffuseMap;

  // roughness map
  const roughnessMap = loader.load('MetalPlates007_4K_Roughness.jpg');
  material.roughnessMap = roughnessMap;

  // metalness map
  const metalnessMap = loader.load('MetalPlates007_4K_Metalness.jpg');
  material.metalnessMap = roughnessMap;

  // normal map
  const normalMap = loader.load('MetalPlates007_4K_Normal.jpg');
  material.normalMap = normalMap;

  return material;
}
