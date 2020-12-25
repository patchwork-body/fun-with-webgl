import { Vector4 } from '../utils';

const createTranslateMatrix = (x = 0.0, y = 0.0, z = 0.0): Float32Array => {
  return new Float32Array([
    ...new Vector4(1.0, 0.0, 0.0, 0.0).asArray(),
    ...new Vector4(0.0, 1.0, 0.0, 0.0).asArray(),
    ...new Vector4(0.0, 0.0, 1.0, 0.0).asArray(),
    ...new Vector4(x, y, z, 1.0).asArray(),
  ]);
};

export { createTranslateMatrix };
