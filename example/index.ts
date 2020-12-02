import { initGlInstance } from 'webgl-lib';

// import pointVertexShader from './point.vs';
// import pointFragmentShader from './point.fs';

const gl = initGlInstance('js-canvas');

if (gl) {
  gl.setClearColor(1.0, 1.0, 1.0, 1.0).resize(800, 600).clear();
}
