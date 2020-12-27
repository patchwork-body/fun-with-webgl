import { Matrix4 } from '../utils/matrices';
import { createTranslationMatrix } from '../utils/matrices/translate';
import { Vector4 } from '../utils/matrices/vector';
import { Mesh } from './mesh';

class Rectangle extends Mesh {
  private _color!: Vector4;
  private _size!: number;
  private _angle = 0;

  constructor({ name, position, color, size, angle }: IRectangleParams) {
    super({ name, position });

    if (color) this._color = color;
    if (size) this._size = size;
    if (angle) this._angle = angle;
  }

  get color(): Vector4 {
    return this._color;
  }

  get size(): number {
    return this._size;
  }

  get angle(): number {
    return this._angle;
  }

  get verticesCount(): number {
    return 4;
  }

  get transformMatrix(): Matrix4 {
    return createTranslationMatrix();
  }

  getRenderMethod(gl: WebGL2RenderingContext): number {
    return gl.TRIANGLE_FAN;
  }
}

export { Rectangle };
