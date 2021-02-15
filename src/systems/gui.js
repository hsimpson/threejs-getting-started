import { GUI } from 'https://unpkg.com/three/examples/jsm/libs/dat.gui.module.js';

let gui;

export function createGUI() {
  gui = new GUI();
}

export function getGUI() {
  return gui;
}
