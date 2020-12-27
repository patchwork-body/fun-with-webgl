import vertexShaderSource from './shaders/polygon.vs';
import fragmentShaderSource from './shaders/polygon.fs';
import { RenderComponent, World } from '../core';
import { Vector4 } from '../utils/matrices/vector';
import { Matrix4 } from '../utils/matrices';
import { createIdentityMatrix } from '../utils/matrices/identity';

class Mesh extends RenderComponent {
  renderMethod = null;

  vertexShaderSource = vertexShaderSource;
  fragmentShaderSource = fragmentShaderSource;
  requireAttribs = ['a_Position'];
  requireUniforms = ['u_FillColor'];

  constructor({ name }: IMeshParams) {
    super({ name });
  }

  get verticesCount(): number {
    return 3;
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

  get transformMatrix(): Matrix4 {
    return createIdentityMatrix();
  }

  getRenderMethod(gl: WebGL2RenderingContext): number {
    return gl.TRIANGLES;
  }

  createVerticies(): Vector4[] {
    const w = 1.0;
    const root = this.getRootComponent() as World;

    const width = root.canvasElement.clientWidth;
    const height = root.canvasElement.clientHeight;

    const ratioX = this.size / (width / 2 / 100) / 100;
    const ratioY = this.size / (height / 2 / 100) / 100;

    const step = 360 / this.verticesCount;

    return new Array(this.verticesCount)
      .fill(null)
      .map((_, index) => step * index + this.angle)
      .map(angle => {
        const radianAngle = (Math.PI * angle) / 180;

        const x = ratioX * Math.sin(radianAngle);
        const y = ratioY * Math.cos(radianAngle);
        const z = 0.0;

        return new Vector4(x, y, z, w);
      });
  }

  updateVertices(): Vector4[] {
    return this.createVerticies().map(vertex => {
      return this.transformMatrix.apply(vertex);
    });
  }

  onEachRenderFrame(gl: WebGL2RenderingContext): void {
    this.replaceVertices(this.updateVertices());

    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this.attribs.a_Position, 4, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(this.attribs.a_Position);
    gl.uniform4f(this.uniforms.u_FillColor, ...this.color.asArray());
    gl.drawArrays(
      this.getRenderMethod(gl),
      this.elementIndex,
      this.vertices.length / 4, // four values per vertex
    );

    super.onEachRenderFrame(gl);
  }
}

export { Mesh };