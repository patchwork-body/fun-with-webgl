import vertexShader from './shaders/point.vs';
import fragmentShader from './shaders/point.fs';
import {
  createFragmentShader,
  createVertextShader,
  createWebGLProgram,
} from '../utils/shader';
import { Component, IComponentConfig } from '../component';
import { initBuffer } from '../utils/buffer';

interface IPointConfig extends IComponentConfig {
  position: [number, number];
  size: number;
  color: [number, number, number];
}

class Point extends Component {
  static vertices = new Float32Array([]);
  static buffer: WebGLBuffer;
  static program: WebGLProgram;
  static a_PointPosition: number;
  static a_PointSize: number;
  static u_PointColor: WebGLUniformLocation | null = null;

  public position: [number, number] = [0.0, 0.0];
  public size = 1.0;
  public color: [number, number, number] = [0.0, 0.0, 0.0];

  private pointNumber = 0;

  constructor({ name, position, size, color }: IPointConfig) {
    super({ name });

    this.position = position;
    this.size = size;
    this.color = color;

    this._storeVertexPosition(this.position);
  }

  private _storeVertexPosition(position: [number, number]): void {
    const arraySize = Point.vertices.length + 2;
    const vertices = new Float32Array(arraySize);

    vertices.set(Point.vertices, 0);
    vertices.set(position, Point.vertices.length);
    this.pointNumber = Point.vertices.length / 2;

    Point.vertices = vertices;
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
    gl.bufferData(gl.ARRAY_BUFFER, Point.vertices, gl.STATIC_DRAW);
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

    gl.drawArrays(gl.POINTS, this.pointNumber, 1);
    super.render(gl);
  }
}

export { Point };
