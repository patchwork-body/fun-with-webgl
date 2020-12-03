import vertexShader from './shaders/point.vs';
import fragmentShader from './shaders/point.fs';
import {
  createFragmentShader,
  createVertextShader,
  createWebGLProgram,
} from '../shader';
import { Component, IComponentConfig } from '../component';

interface IPointConfig extends IComponentConfig {
  position: [number, number, number];
  size: number;
}

class Point extends Component {
  private _position: [number, number, number] = [0.0, 0.0, 0.0];
  private _size = 1.0;

  constructor({ name, position, size }: IPointConfig) {
    super({ name });

    this._position = position;
    this._size = size;
  }

  render(gl: WebGL2RenderingContext): void {
    const vShader = createVertextShader(gl, vertexShader);
    const fShader = createFragmentShader(gl, fragmentShader);

    const program = createWebGLProgram(gl, vShader, fShader, true);
    gl.useProgram(program);

    const pointPosition = gl.getAttribLocation(program, 'a_PointPosition');
    const pointSize = gl.getAttribLocation(program, 'a_PointSize');

    gl.vertexAttrib3f(pointPosition, ...this._position);
    gl.vertexAttrib1f(pointSize, this._size);

    gl.drawArrays(gl.POINTS, 0, 1);

    super.render(gl);
  }
}

export { Point };
