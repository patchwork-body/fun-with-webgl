import { createTranslateMatrix } from '../utils/matrices/translate';
import { Vector4 } from '../utils/matrices/vector';
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

  get verticesCount(): number {
    return 3;
  }

  get translateMatrixData(): Float32Array {
    return createTranslateMatrix();
  }

  getRenderMethod(gl: WebGL2RenderingContext): number {
    return gl.TRIANGLES;
  }
}

export { Triangle };
