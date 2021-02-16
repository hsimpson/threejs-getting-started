export const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
}
`;

export const fragmentShader = `
uniform float scale;
uniform vec3 even;
uniform vec3 odd;

varying vec2 vUv;

float modulo(float x) {
  return x - floor(x);
}

void main () {
  vec2 xy = vUv * scale;
  
  bool x  = modulo(xy.x) < 0.5;
  bool y  = modulo(xy.y) < 0.5;

  vec3 outputColor;

  if (x ^^ y) {
    outputColor = even;
  } else {
    outputColor = odd;
  }
  
  gl_FragColor = vec4(outputColor, 1.0);
}
`;
