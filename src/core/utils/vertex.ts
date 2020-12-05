interface IVertex {
  x: number;
  y: number;
  z: number;
}

class Vertex implements IVertex {
  public x = 0.0;
  public y = 0.0;
  public z = 0.0;

  constructor({ x, y, z }: Record<string, number>) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export { Vertex };
