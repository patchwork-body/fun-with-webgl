import {
  createIdentityMatrix,
  createRotationMatrix,
  createTranslateMatrix,
  Matrix4,
} from '../utils/matrices';
import { Vector4 } from '../utils/matrices/vector';
import { Mesh } from './mesh';

class Triangle extends Mesh {
  private _color!: Vector4;
  private _size!: number;
  private _matrix = createIdentityMatrix();

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

  rotate(angle: number): void {
    this._matrix = this._matrix.multiply(createRotationMatrix(angle));
  }

  translate(x: number, y: number): void {
    this._matrix = this._matrix.multiply(createTranslateMatrix(x, y));
    console.log(this._matrix);
  }

  get transformMatrix(): Matrix4 {
    return this._matrix;
  }
}

export { Triangle };
