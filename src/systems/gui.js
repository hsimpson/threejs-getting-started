import * as dat from 'dat.gui';

let gui;

export function createGUI() {
  gui = new dat.GUI();
}

export function getGUI() {
  return gui;
}
