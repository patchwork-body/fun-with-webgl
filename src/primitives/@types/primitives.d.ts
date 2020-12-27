interface IMeshParams extends IBaseComponentParams {
  position?: Vector4;
}

interface ITriangleParams extends IMeshParams {
  color: Vector4;
  size: number;
  angle?: number;
}

type IRectangleParams = ITriangleParams;
