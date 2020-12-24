import { World } from '../core';
import { Vector4 } from '../utils/vector';
import { Polygon } from './polygon';

class Triangle extends Polygon {
  color: Vector4 = new Vector4(1.0, 0.0, 0.0, 1.0);
  size = 5;

  constructor({ name, position, size, color }: ITriangleParams) {
    super({ name, position });

    if (color) this.color = color;
    if (size) this.size = size;
  }

  getVerticies(): Vector4[] {
    const w = 1.0;
    const root = this.getRootComponent() as World;

    const width = root.canvasElement.width;
    const height = root.canvasElement.height;

    const ratioX = (width / 2 / 100) * (this.size / 100);
    const ratioY = (height / 2 / 100) * (this.size / 100);

    const step = 360 / 3;

    return new Array(3)
      .fill(null)
      .map((_, index) => step * index + 30)
      .map(angle => {
        const radianAngle = (Math.PI * angle) / 180;

        const x = ratioX * Math.cos(radianAngle);
        const y = ratioY * -Math.sin(radianAngle); // minus because OpenGL use right-handed coordinate system
        const z = 0.0;

        return new Vector4(x, y, z, w);
      });
  }

  getColor(): Vector4 {
    return this.color;
  }

  getRenderMethod(gl: WebGL2RenderingContext): number {
    return gl.TRIANGLES;
  }
}

export { Triangle };
