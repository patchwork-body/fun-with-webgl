class Vector4 implements IVector4 {
  constructor(public x = 0.0, public y = 0.0, public z = 0.0, public w = 1.0) {}

  asArray(): [number, number, number, number] {
    return [this.x, this.y, this.z, this.w];
  }

  multiply(otherVec: Vector4): number {
    return (
      this.x * otherVec.x +
      this.y * otherVec.y +
      this.z * otherVec.z +
      this.w * otherVec.w
    );
  }
}

export { Vector4 };
