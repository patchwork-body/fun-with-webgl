interface IWorldConfig extends IBaseComponentParams {
  domElementID: string;
  width: number;
  height: number;
  clearColor: [number, number, number];
  autoResize: boolean;
}
