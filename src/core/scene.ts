import { renderLoop } from '../utils/render_loop';
import { BaseComponent } from './component';
import { World } from './world';

class Scene extends BaseComponent<World, IBaseComponent> {
  static sceneIndex = 0;
  playing = false;
  gl: WebGL2RenderingContext | undefined;

  constructor({ name = `scene_${Scene.sceneIndex}` }: { name: string }) {
    super({ name: name, group: 'scenes' });
  }

  play(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.playing = true;
    this.componentWillBeRenderedFirstTime(gl);

    renderLoop(() => {
      this.clear(gl);
      this.onEachRenderFrame(gl);
    });
  }

  attachChildComponent(component: IBaseComponent): void {
    if (this.playing && this.gl) {
      component.componentWillBeRenderedFirstTime(this.gl);
    }
    super.attachChildComponent(component);
  }

  clear(gl: WebGL2RenderingContext): void {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
}

export { Scene };
