import vertexShader from './shaders/point.vs';
import fragmentShader from './shaders/point.fs';
import {
  createFragmentShader,
  createVertextShader,
  createWebGLProgram,
} from '../utils/shader';
import { RenderComponent, IComponentConfig } from '../component';
import { initBuffer } from '../utils/buffer';

interface IPointConfig extends IComponentConfig {
  position: [number, number];
  size: number;
  color: [number, number, number];
}

class Point extends RenderComponent {
  static buffer: WebGLBuffer;
  static program: WebGLProgram;
  static a_PointPosition: number;
  static a_PointSize: number;
  static u_PointColor: WebGLUniformLocation | null = null;

  public position: [number, number] = [0.0, 0.0];
  public size = 1.0;
  public color: [number, number, number] = [0.0, 0.0, 0.0];

  constructor({ name, position, size, color }: IPointConfig) {
    super({ name, vertices: new Float32Array(position) });

    this.position = position;
    this.size = size;
    this.color = color;
  }

  init(gl: WebGL2RenderingContext): void {
    const vShader = createVertextShader(gl, vertexShader);
    const fShader = createFragmentShader(gl, fragmentShader);

    Point.program = createWebGLProgram(gl, vShader, fShader, true);
    gl.useProgram(Point.program);

    Point.a_PointPosition = gl.getAttribLocation(
      Point.program,
      'a_PointPosition',
    );
    Point.a_PointSize = gl.getAttribLocation(Point.program, 'a_PointSize');
    Point.u_PointColor = gl.getUniformLocation(Point.program, 'u_PointColor');

    Point.buffer = initBuffer(gl);
  }

  initComponent = (gl: WebGL2RenderingContext): void => {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      this.constructor.prototype.vertices,
      gl.DYNAMIC_DRAW,
    );
  };

  render(gl: WebGL2RenderingContext): void {
    if (!Point.program) {
      this.init(gl);
    }

    if (!this.initialized) {
      this.initComponent(gl);
    }

    gl.vertexAttribPointer(Point.a_PointPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(Point.a_PointPosition);

    gl.vertexAttrib1f(Point.a_PointSize, this.size);
    gl.uniform4f(Point.u_PointColor, ...this.color, 1.0);

    gl.drawArrays(gl.POINTS, this.elementIndex, 1);
    super.render(gl);
  }
}

export { Point };
