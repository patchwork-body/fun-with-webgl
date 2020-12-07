import vertexShaderSource from './shaders/triangle.vs';
import fragmentShaderSource from './shaders/triangle.fs';
import { Component } from '../core';
import { Vector4 } from '../utils/vector';

class Rectangle extends Component {
  public position: Vector4[];
  public color: [number, number, number];

  public vertexShaderSource = vertexShaderSource;
  public fragmentShaderSource = fragmentShaderSource;
  public requireAttribs = ['a_TrianglePosition'];
  public requireUniforms = ['u_TriangleFillColor'];

  constructor({
    name,
    position,
    color,
  }: {
    name: string;
    position: Vector4[];
    color: [number, number, number];
  }) {
    super({ name, vertices: position });

    this.position = position;
    this.color = color;
  }

  onEachRenderFrame(gl: WebGL2RenderingContext): void {
    super.onEachRenderFrame(gl);

    gl.vertexAttribPointer(
      this.attribs.a_TrianglePosition,
      4,
      gl.FLOAT,
      false,
      0,
      0,
    );
    gl.enableVertexAttribArray(this.attribs.a_TrianglePosition);
    gl.uniform4f(this.uniforms.u_TriangleFillColor, ...this.color, 1.0);
    gl.drawArrays(gl.TRIANGLE_FAN, this.elementIndex, 4);
  }
}

export { Rectangle };
