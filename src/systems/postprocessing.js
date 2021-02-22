import { EffectComposer } from '/node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '/node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '/node_modules/three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from '/node_modules/three/examples/jsm/shaders/GammaCorrectionShader.js';
import { SepiaShader } from '/node_modules/three/examples/jsm/shaders/SepiaShader.js';
import { VignetteShader } from '/node_modules/three/examples/jsm/shaders/VignetteShader.js';
import { SMAAPass } from '/node_modules/three/examples/jsm/postprocessing/SMAAPass.js';

import { getGUI } from './gui.js';

export function createPostProcessing(renderer, scene, camera) {
  // create the effect composer which manages the effect chain
  const composer = new EffectComposer(renderer);

  // first add the render pass
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // add gamma correction pass
  const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
  composer.addPass(gammaCorrectionPass);

  // add sepia pass
  const sepiaSettings = {
    amount: 1.0,
  };
  const sepiaPass = new ShaderPass(SepiaShader);
  sepiaPass.uniforms['amount'].value = sepiaSettings.amount;
  composer.addPass(sepiaPass);

  // add vignette pass
  const vignetteSettings = {
    offset: 1.0,
    darkness: 1.0,
  };
  const vignettePass = new ShaderPass(VignetteShader);
  vignettePass.uniforms['offset'].value = vignetteSettings.offset;
  vignettePass.uniforms['darkness'].value = vignetteSettings.darkness;
  composer.addPass(vignettePass);

  // add smaa pass
  const smaaPass = new SMAAPass(
    window.innerWidth * renderer.getPixelRatio(),
    window.innerHeight * renderer.getPixelRatio()
  );
  composer.addPass(smaaPass);

  const gui = getGUI();
  if (gui) {
    const pp = gui.addFolder('Postprocessing');
    const sep = pp.addFolder('Sepia');
    sep.add(sepiaSettings, 'amount', 0, 5).onChange((value) => {
      sepiaPass.uniforms['amount'].value = value;
    });

    const vig = pp.addFolder('Vignette');
    vig.add(vignetteSettings, 'offset', 0, 5).onChange((value) => {
      vignettePass.uniforms['offset'].value = value;
    });
    vig.add(vignetteSettings, 'darkness', 0, 5).onChange((value) => {
      vignettePass.uniforms['darkness'].value = value;
    });
  }

  return composer;
}
