import vertexShaderSource from './shaders/polygon.vs';
import fragmentShaderSource from './shaders/polygon.fs';
import { RenderComponent } from '../core';
import { Vector4 } from '../utils/matrices/vector';
import { Matrix4 } from '../utils/matrices';
import { createIdentityMatrix } from '../utils/matrices/identity';
import { NotImplementedError } from '../utils';

class Mesh extends RenderComponent {
  renderMethod = null;

  vertexShaderSource = vertexShaderSource;
  fragmentShaderSource = fragmentShaderSource;
  requireAttribs = ['a_Position'];
  requireUniforms = ['u_FillColor'];

  constructor({ name }: IMeshParams) {
    super({ name });
  }

  get position(): Vector4 {
    return new Vector4();
  }

  get originPosition(): Vector4 {
    return new Vector4();
  }

  get color(): Vector4 {
    return new Vector4(1.0);
  }

  get size(): number {
    return 10;
  }

  get angle(): number {
    return 0;
  }

  get vertices(): Vector4[] {
    throw new NotImplementedError();
  }

  get transformMatrix(): Matrix4 {
    return createIdentityMatrix();
  }

  getRenderMethod(gl: WebGL2RenderingContext): number {
    return gl.TRIANGLES;
  }

  updateVertices(): Vector4[] {
    return this.vertices.map(vertex => {
      return this.transformMatrix.apply(vertex);
    });
  }

  componentWillBeRenderedFirstTime(gl: WebGL2RenderingContext): void {
    this.fillVertciesArray(this.vertices);
    super.componentWillBeRenderedFirstTime(gl);
  }

  onEachRenderFrame(gl: WebGL2RenderingContext): void {
    this.fillVertciesArray(this.updateVertices());
    console.log(this.vertices, this.verticesArray);

    gl.bufferData(gl.ARRAY_BUFFER, this.verticesArray, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this.attribs.a_Position, 4, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(this.attribs.a_Position);
    gl.uniform4f(this.uniforms.u_FillColor, ...this.color.asArray());
    gl.drawArrays(
      this.getRenderMethod(gl),
      this.elementIndex,
      this.vertices.length,
    );

    super.onEachRenderFrame(gl);
  }
}

export { Mesh };
