import { Component, IComponentConfig } from './component';

type ISceneConfig = IComponentConfig;

class Scene extends Component {
  constructor(config: ISceneConfig) {
    super({ name: config.name });
  }

  start(gl: WebGL2RenderingContext): void {
    this.clearScene(gl);
    this.render(gl);
  }

  clearScene(gl: WebGL2RenderingContext): void {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
}

export { Scene };
