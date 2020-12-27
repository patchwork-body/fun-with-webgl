import {
  createIdentityMatrix,
  createRotationMatrix,
  createTranslationMatrix,
  Matrix4,
} from '../utils/matrices';
import { Vector4 } from '../utils/matrices/vector';
import { Mesh } from './mesh';

class Triangle extends Mesh {
  private _color!: Vector4;
  private _size!: number;
  private _matrix = createIdentityMatrix();

  private rotationMatrix = createIdentityMatrix();
  private translationMatrix = createIdentityMatrix();

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
    this.rotationMatrix = createRotationMatrix(angle);
  }

  translate(x: number, y: number): void {
    this.translationMatrix = createTranslationMatrix(x, y);
  }

  get transformMatrix(): Matrix4 {
    return this._matrix
      .multiply(this.rotationMatrix)
      .multiply(this.translationMatrix);
  }
}

export { Triangle };
