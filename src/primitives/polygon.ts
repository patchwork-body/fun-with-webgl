import vertexShaderSource from './shaders/polygon.vs';
import fragmentShaderSource from './shaders/polygon.fs';
import { RenderComponent } from '../core';
import { NotImplementedError } from '../utils/errors';
import { Vector4 } from '../utils/vector';

class Polygon extends RenderComponent {
  position!: Vector4;
  originPosition = new Vector4();
  angle = 0;
  renderMethod = null;

  vertexShaderSource = vertexShaderSource;
  fragmentShaderSource = fragmentShaderSource;
  requireAttribs = ['a_Position'];
  requireUniforms = ['u_FillColor'];

  constructor({ name, position }: IPolygonParams) {
    super({ name });

    this.position = position;
  }

  getVerticies(): Vector4[] {
    throw new NotImplementedError();
  }

  getColor(): Vector4 {
    throw new NotImplementedError();
  }

  getRenderMethod(_gl: WebGL2RenderingContext): number {
    throw new NotImplementedError();
  }

  componentWillBeRenderedFirstTime(gl: WebGL2RenderingContext): void {
    this.addVertices(this.getVerticies());
    super.componentWillBeRenderedFirstTime(gl);
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

    gl.enableVertexAttribArray(this.attribs.a_Position);
    gl.uniform4f(this.uniforms.u_FillColor, ...this.getColor().asArray());
    gl.drawArrays(
      this.getRenderMethod(gl),
      this.elementIndex,
      this.constructor.prototype.vertices.length / 4,
    );
  }
}

export { Polygon };
