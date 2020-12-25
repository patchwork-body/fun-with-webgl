class Matrix4 {
  constructor(public x = 0.0, public y = 0.0, public z = 0.0) {}

  asArray(): Float32Array {
    return new Float32Array([
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      this.x,
      this.y,
      this.z,
      1.0,
    ]);
  }
}

export { Matrix4 };
