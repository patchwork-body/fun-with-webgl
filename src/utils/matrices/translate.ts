import { Vector4 } from './vector';
import { Matrix4 } from './matrix';

const createTranslationMatrix = (x = 0.0, y = 0.0, z = 0.0): Matrix4 => {
  return new Matrix4([
    new Vector4(1.0, 0.0, 0.0, 0.0),
    new Vector4(0.0, 1.0, 0.0, 0.0),
    new Vector4(0.0, 0.0, 1.0, 0.0),
    new Vector4(x, y, z, 1.0),
  ]);
};

export { createTranslationMatrix };
