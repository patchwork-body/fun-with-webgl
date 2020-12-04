import { Component, IComponentConfig } from './component';
import { renderLoop } from './render_loop';

interface IWorldConfig extends IComponentConfig {
  id: string;
  width: number;
  height: number;
  clearColor: [number, number, number];
  autoResize: boolean;
}

class World extends Component {
  public canvasElement: HTMLCanvasElement;
  public gl: WebGL2RenderingContext;

  constructor(config: IWorldConfig) {
    super({ name: config.name });

    this.canvasElement = document.getElementById(
      config.id,
    ) as HTMLCanvasElement;

    this.canvasElement.style.setProperty('width', config.width.toString());
    this.canvasElement.style.setProperty('height', config.height.toString());
    this.canvasElement.width = config.width;
    this.canvasElement.height = config.height;

    this.gl = this.canvasElement.getContext('webgl2') as WebGL2RenderingContext;
    this.gl.clearColor(...config.clearColor, 1.0);

    this.canvasElement.addEventListener('resize', event => {
      const canvas = event.target as HTMLCanvasElement;
      this.gl.viewport(0, 0, canvas.width, canvas.height);
    });
  }

  startScene(name: string): void {
    renderLoop(() => {
      this.components[name].render(this.gl);
    });
  }
}

export { World };
