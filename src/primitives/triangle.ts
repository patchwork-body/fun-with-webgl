import { Vector4 } from '../utils/vector';
import { Polygon } from './polygon';

class Triangle extends Polygon {
  private _color!: Vector4;
  private _size!: number;

  constructor({ name, position, color, size }: ITriangleParams) {
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

  getRenderMethod(gl: WebGL2RenderingContext): number {
    return gl.TRIANGLES;
  }
}

export { Triangle };
