import { ShaderMaterial, Color } from '../../three/build/three.module.js';
import { vertexShader, fragmentShader } from '../shaders/basicshader.js';

export function createMaterial(settings) {
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  return material;
}
