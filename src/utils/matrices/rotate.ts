import { Vector4 } from '..';

const createRotationMatrix = (angle: number): Float32Array => {
  const angleInRadians = (Math.PI * angle) / 180;

  const sin = Math.sin(angleInRadians);
  const cos = Math.cos(angleInRadians);

  return new Float32Array([
    ...new Vector4(cos, -sin, 0.0, 0.0).asArray(),
    ...new Vector4(sin, cos, 0.0, 0.0).asArray(),
    ...new Vector4(0.0, 0.0, 1.0, 0.0).asArray(),
    ...new Vector4(0.0, 0.0, 0.0, 1.0).asArray(),
  ]);
};

export { createRotationMatrix };
