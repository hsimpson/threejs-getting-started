import { MeshStandardMaterial, TextureLoader, sRGBEncoding, Vector2, RepeatWrapping } from 'three';

export function createMaterial() {
  const loader = new TextureLoader().setPath('assets/materials/Tiles037/');
  const material = new MeshStandardMaterial();
  material.metalness = 0.0;

  // diffuse map aka albedo
  const diffuseMap = loader.load('Tiles037_2K_Color.jpg');
  diffuseMap.encoding = sRGBEncoding;
  diffuseMap.repeat = new Vector2(2, 2);
  diffuseMap.wrapS = RepeatWrapping;
  diffuseMap.wrapT = RepeatWrapping;
  material.map = diffuseMap;

  // roughness map
  const roughnessMap = loader.load('Tiles037_2K_Roughness.jpg');
  roughnessMap.repeat = new Vector2(2, 2);
  roughnessMap.wrapS = RepeatWrapping;
  roughnessMap.wrapT = RepeatWrapping;
  material.roughnessMap = roughnessMap;

  // normal map
  const normalMap = loader.load('Tiles037_2K_Normal.jpg');
  normalMap.repeat = new Vector2(2, 2);
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  material.normalMap = normalMap;

  return material;
}
