interface IWorld {
  canvasElement: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  startScene(name: string): void;
}

interface IWorldParams extends IBaseComponentParams {
  domElementID: string;
  width: number;
  height: number;
  clearColor: [number, number, number];
  autoResize: boolean;
}
