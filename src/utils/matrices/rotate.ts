import { Vector4 } from './vector';
import { Matrix4 } from './matrix';

const createRotationMatrix = (angle: number): Matrix4 => {
  const angleInRadians = (Math.PI * angle) / 180;

  const sin = Math.sin(angleInRadians);
  const cos = Math.cos(angleInRadians);

  return new Matrix4([
    new Vector4(cos, -sin, 0.0, 0.0),
    new Vector4(sin, cos, 0.0, 0.0),
    new Vector4(0.0, 0.0, 1.0, 0.0),
    new Vector4(0.0, 0.0, 0.0, 1.0),
  ]);
};

export { createRotationMatrix };
