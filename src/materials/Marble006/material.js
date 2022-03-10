import { MeshStandardMaterial, TextureLoader, sRGBEncoding } from 'three';

export function createMaterial() {
  const loader = new TextureLoader().setPath('assets/materials/Marble006/');
  const material = new MeshStandardMaterial();
  material.metalness = 0.0;

  // diffuse map aka albedo
  const diffuseMap = loader.load('Marble006_2K_Color.jpg');
  diffuseMap.encoding = sRGBEncoding;
  material.map = diffuseMap;

  // roughness map
  const roughnessMap = loader.load('Marble006_2K_Roughness.jpg');
  material.roughnessMap = roughnessMap;

  // normal map
  const normalMap = loader.load('Marble006_2K_Normal.jpg');
  material.normalMap = normalMap;

  return material;
}
