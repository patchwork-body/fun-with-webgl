import vertexShaderSource from './shaders/polygon.vs';
import fragmentShaderSource from './shaders/polygon.fs';
import { RenderComponent, World } from '../core';
import { NotImplementedError } from '../utils/errors';
import { Vector4 } from '../utils/vector';

class Polygon extends RenderComponent {
  position = new Vector4();
  originPosition = new Vector4();
  angle = 0;
  renderMethod = null;

  vertexShaderSource = vertexShaderSource;
  fragmentShaderSource = fragmentShaderSource;
  requireAttribs = ['a_Position'];
  requireUniforms = ['u_FillColor'];

  constructor({ name }: IPolygonParams) {
    super({ name });
  }

  get verticesCount(): number {
    return 3;
  }

  get color(): Vector4 {
    return new Vector4(1.0);
  }

  get size(): number {
    return 10;
  }

  replaceVerticies(): void {
    const w = 1.0;
    const root = this.getRootComponent() as World;

    const width = root.canvasElement.width;
    const height = root.canvasElement.height;

    const ratioX = this.size / (width / 2 / 100) / 100;
    const ratioY = this.size / (height / 2 / 100) / 100;

    const step = 360 / this.verticesCount;

    const newVertices = new Array(this.verticesCount)
      .fill(null)
      .map((_, index) => step * index)
      .map(angle => {
        const radianAngle = (Math.PI * angle) / 180;

        const x = ratioX * Math.sin(radianAngle);
        const y = ratioY * Math.cos(radianAngle);
        const z = 0.0;

        return new Vector4(x, y, z, w);
      });

    // drop prevision vertices
    this.vertices = new Float32Array([]);
    this.addVertices(newVertices);
  }

  getRenderMethod(_gl: WebGL2RenderingContext): number {
    throw new NotImplementedError();
  }

  componentWillBeRenderedFirstTime(gl: WebGL2RenderingContext): void {
    this.replaceVerticies();
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
    console.log(this.name);
    gl.uniform4f(this.uniforms.u_FillColor, ...this.color.asArray());
    gl.drawArrays(
      this.getRenderMethod(gl),
      this.elementIndex,
      this.vertices.length / 4, // four because x, y, z, w
    );
  }
}

export { Polygon };
