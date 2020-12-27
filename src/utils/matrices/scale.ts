import { Matrix4 } from './matrix';
import { Vector4 } from './vector';

const createScaleMatrix = (x = 0.0, y = 0.0, z = 0.0): Matrix4 => {
  return new Matrix4([
    new Vector4(x, 0.0, 0.0, 0.0),
    new Vector4(0.0, y, 0.0, 0.0),
    new Vector4(0.0, 0.0, z, 0.0),
    new Vector4(0.0, 0.0, 0.0, 1.0),
  ]);
};

export { createScaleMatrix };
