import { ShaderMaterial, Color } from 'three';
import { vertexShader, fragmentShader } from '../shaders/checkerboardshader.js';

export function createMaterial(settings) {
  const uniforms = {
    even: { type: 'vec3', value: new Color(settings.even) },
    odd: { type: 'vec3', value: new Color(settings.odd) },
    scale: { value: settings.scale }, // scalar value
  };

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  return material;
}
