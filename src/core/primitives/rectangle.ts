import vertexShaderSource from './shaders/triangle.vs';
import fragmentShaderSource from './shaders/triangle.fs';
import { IComponentConfig } from '../component';
import { RenderComponent } from '../renders';

interface ITriangleConfig extends IComponentConfig {
  position: Float32Array;
  color: [number, number, number];
}

class Rectangle extends RenderComponent {
  public position: Float32Array;
  public color: [number, number, number];

  public vertexShaderSource = vertexShaderSource;
  public fragmentShaderSource = fragmentShaderSource;
  public requireAttribs = ['a_TrianglePosition'];
  public requireUniforms = ['u_TriangleFillColor'];

  constructor({ name, position, color }: ITriangleConfig) {
    super({ name, vertices: position });

    this.position = position;
    this.color = color;
  }

  render(gl: WebGL2RenderingContext): void {
    super.render(gl);

    gl.vertexAttribPointer(
      this.attribs.a_TrianglePosition,
      2,
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
