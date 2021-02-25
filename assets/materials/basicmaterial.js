import { ShaderMaterial, Color } from '/node_modules/three/build/three.module.js';
import { vertexShader, fragmentShader } from '../shaders/basicshader.js';

export function createMaterial(settings) {
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  return material;
}
