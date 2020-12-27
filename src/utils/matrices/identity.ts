import { Matrix4 } from './matrix';
import { Vector4 } from './vector';

const createIdentityMatrix = (): Matrix4 => {
  return new Matrix4([
    new Vector4(1.0, 0.0, 0.0, 0.0),
    new Vector4(0.0, 1.0, 0.0, 0.0),
    new Vector4(0.0, 0.0, 1.0, 0.0),
    new Vector4(0.0, 0.0, 0.0, 1.0),
  ]);
};

export { createIdentityMatrix };
