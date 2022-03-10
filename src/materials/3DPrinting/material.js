import { MeshStandardMaterial, TextureLoader, sRGBEncoding, Vector2, RepeatWrapping, ClampToEdgeWrapping } from 'three';

export function createMaterial() {
  const loader = new TextureLoader().setPath('assets/materials/3DPrinting/');
  const material = new MeshStandardMaterial({
    color: '#000329',
    metalness: 0.0,
    roughness: 0.3,
  });

  // normal map
  const normalMap = loader.load('3DPrintSimulator_NormalMap2K.png');
  // normalMap.repeat = new Vector2(2, 2);
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  material.normalMap = normalMap;

  return material;
}
