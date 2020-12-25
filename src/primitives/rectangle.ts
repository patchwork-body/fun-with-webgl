import { Vector4 } from '../utils/vector';
import { Polygon } from './polygon';

class Rectangle extends Polygon {
  private _color!: Vector4;
  private _size!: number;

  constructor({ name, position, color, size }: IRectangleParams) {
    super({ name, position });

    if (color) this._color = color;
    if (size) this._size = size;
  }

  get color(): Vector4 {
    return this._color;
  }

  get size(): number {
    return this._size;
  }

  get verticesCount(): number {
    return 4;
  }

  getRenderMethod(gl: WebGL2RenderingContext): number {
    return gl.TRIANGLE_FAN;
  }
}

export { Rectangle };
