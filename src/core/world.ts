import { BaseComponent } from './component';
import { Scene } from './scene';

class World extends BaseComponent<never, IBaseComponent> implements IWorld {
  canvasElement: HTMLCanvasElement;
  gl: WebGL2RenderingContext;

  constructor(config: IWorldParams) {
    super({ name: config.name, group: 'worlds' });

    this.canvasElement = document.getElementById(
      config.domElementID,
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
    const scene = this._children[name];
    if (scene instanceof Scene) {
      scene.play(this.gl);
    }
  }
}

export { World };
