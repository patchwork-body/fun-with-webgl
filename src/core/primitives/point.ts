import vertexShaderSource from './shaders/point.vs';
import fragmentShaderSource from './shaders/point.fs';
import { RenderComponent, IComponentConfig } from '../component';

interface IPointConfig extends IComponentConfig {
  position: [number, number];
  size: number;
  color: [number, number, number];
}

class Point extends RenderComponent {
  public position: [number, number] = [0.0, 0.0];
  public size = 1.0;
  public color: [number, number, number] = [0.0, 0.0, 0.0];

  public vertexShaderSource = vertexShaderSource;
  public fragmentShaderSource = fragmentShaderSource;
  public requireAttribs = ['a_PointPosition', 'a_PointSize'];
  public requireUniforms = ['u_PointColor'];

  constructor({ name, position, size, color }: IPointConfig) {
    super({
      name,
      vertices: new Float32Array(position),
    });

    this.position = position;
    this.size = size;
    this.color = color;
  }

  render(gl: WebGL2RenderingContext): void {
    super.render(gl);

    gl.vertexAttribPointer(
      this.attribs.a_PointPosition,
      2,
      gl.FLOAT,
      false,
      0,
      0,
    );
    gl.enableVertexAttribArray(this.attribs.a_PointPosition);

    gl.vertexAttrib1f(this.attribs.a_PointSize, this.size);
    gl.uniform4f(this.uniforms.u_PointColor, ...this.color, 1.0);

    gl.drawArrays(gl.POINTS, this.elementIndex, 1);
  }
}

export { Point };
