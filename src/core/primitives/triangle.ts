import { Component, IComponentConfig } from '../component';

interface ITriangleConfig extends IComponentConfig {
  position: Float32Array;
  color: [number, number, number];
}

class Triangle extends Component {
  static vertices = new Float32Array([]);
  static buffer: WebGLBuffer;
  static program: WebGLProgram;
  static a_PointPosition: number;
  static u_PointColor: WebGLUniformLocation | null = null;

  public position: Float32Array;
  public color: [number, number, number];

  constructor({ name, position, color }: ITriangleConfig) {
    super({ name });

    this.position = position;
    this.color = color;
  }
}

export { Triangle };
