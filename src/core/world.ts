import { Scene } from './scene';

interface IWorldConfig {
  id: string;
  width: number;
  height: number;
  clearColor: [number, number, number];
  autoResize: boolean;
}

class World {
  private scenes: Record<string, Scene> = {};
  private canvasElement: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;

  constructor(config: IWorldConfig) {
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

  addScene(scene: Scene): void {
    this.scenes[scene.name] = scene;
  }

  startScene(name: string): void {
    this.scenes[name].start(this.gl);
  }
}

export { World };
