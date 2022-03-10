import { RenderEngine } from './renderengine.js';
import './style.css';

// const shadow = false;
const shadow = true;
const renderEngine = new RenderEngine(shadow);
renderEngine.start();
