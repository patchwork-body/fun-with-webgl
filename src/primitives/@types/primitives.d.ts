interface IPolygonParams extends IBaseComponentParams {
  position?: Vector4;
}

interface ITriangleParams extends IPolygonParams {
  color: Vector4;
  size: number;
  angle?: number;
}

type IRectangleParams = ITriangleParams;
