/* eslint-disable @typescript-eslint/ban-ts-comment */
import { glLib, ShaderType } from 'webgl-lib';

// @ts-ignore
import pointVertexShader from './point.vs';
// @ts-ignore
import pointFragmentShader from './point.fs';

const gl = glLib('js-canvas');

if (gl) {
  gl.setClearColor([1.0, 1.0, 1.0, 1.0])
    .resize(800, 600)
    .clear()
    .createShader(ShaderType.Vertex, pointVertexShader)
    .createShader(ShaderType.Fragment, pointFragmentShader)
    .createProgram()
    .draw();
}
