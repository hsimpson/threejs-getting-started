import {
  UnsignedByteType,
  PMREMGenerator,
  TextureLoader,
  EquirectangularReflectionMapping,
  sRGBEncoding,
} from '/node_modules/three/build/three.module.js';
import { RGBELoader } from '/node_modules/three/examples/jsm/loaders/RGBELoader.js';

export function createEnvironment(renderer, scene) {
  const filename = 'old_depot_2k.hdr';
  const path = 'assets/environments/';

  // load the HDR equirectangular texture for reflections
  const pmremGenerator = new PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader()
    .setDataType(UnsignedByteType)
    .setPath(path)
    .load(filename, function (hdrEquirect) {
      const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);
      hdrEquirect.dispose();
      pmremGenerator.dispose();

      scene.environment = hdrCubeRenderTarget.texture;
    });

  // load the LDR equirectangular texture for background
  const textureLoader = new TextureLoader();
  const textureEquirec = textureLoader.load(`${path}old_depot.jpg`);
  textureEquirec.mapping = EquirectangularReflectionMapping;
  textureEquirec.encoding = sRGBEncoding;
  scene.background = textureEquirec;
}
