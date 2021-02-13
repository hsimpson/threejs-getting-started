import {
  UnsignedByteType,
  PMREMGenerator,
  TextureLoader,
  EquirectangularReflectionMapping,
  sRGBEncoding,
} from 'https://unpkg.com/three/build/three.module.js';
import { RGBELoader } from 'https://unpkg.com/three/examples/jsm/loaders/RGBELoader.js';

export function createEnvironment(renderer, scene) {
  const filename = 'old_depot_2k.hdr';
  const path = 'assets/textures/';

  // load the HDR equirectangular texture for reflections
  const pmremGenerator = new PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader()
    .setDataType(UnsignedByteType)
    .setPath(path)
    .load(filename, function (hdrEquirect) {
      const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);
      hdrEquirect.dispose();

      scene.environment = hdrCubeRenderTarget.texture;
    });

  // load the LDR equirectangular texture for background
  const textureLoader = new TextureLoader();
  const textureEquirec = textureLoader.load(`${path}old_depot.jpg`);
  textureEquirec.mapping = EquirectangularReflectionMapping;
  textureEquirec.encoding = sRGBEncoding;
  scene.background = textureEquirec;
}
