interface IPolygonParams extends IBaseComponentParams {
  position: Vector4;
}

interface ITriangleParams extends IBaseComponentParams {
  position: Vector4;
  size?: number;
  color?: Vector4;
}
