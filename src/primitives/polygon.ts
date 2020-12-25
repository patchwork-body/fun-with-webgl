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

  getVerticies(): Vector4[] {
    const w = 1.0;
    const root = this.getRootComponent() as World;

    const width = root.canvasElement.width;
    const height = root.canvasElement.height;

    const ratioX = (width / 2 / 100) * (this.size / 100);
    const ratioY = (height / 2 / 100) * (this.size / 100);

    const step = 360 / this.verticesCount;

    return new Array(this.verticesCount)
      .fill(null)
      .map((_, index) => step * index)
      .map(angle => {
        const radianAngle = (Math.PI * angle) / 180;

        const x = ratioX * Math.cos(radianAngle);
        const y = ratioY * -Math.sin(radianAngle); // minus because OpenGL use right-handed coordinate system
        const z = 0.0;

        return new Vector4(x, y, z, w);
      });
  }

  getRenderMethod(_gl: WebGL2RenderingContext): number {
    throw new NotImplementedError();
  }

  preRender(gl: WebGL2RenderingContext): void {
    this.addVertices(this.getVerticies());
    super.preRender(gl);
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
    gl.uniform4f(this.uniforms.u_FillColor, ...this.color.asArray());
    gl.drawArrays(
      this.getRenderMethod(gl),
      this.elementIndex,
      this.constructor.prototype.vertices.length / 4,
    );
  }
}

export { Polygon };
