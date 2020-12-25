import { renderLoop } from '../utils/render_loop';
import { BaseComponent } from './component';
import { World } from './world';

class Scene extends BaseComponent<World, IBaseComponent> {
  static sceneIndex = 0;
  playing = false;
  gl: WebGL2RenderingContext | undefined;

  private renderLoopID!: number;

  constructor({ name = `scene_${Scene.sceneIndex}` }: { name: string }) {
    super({ name: name, group: 'scenes' });
  }

  play(gl: WebGL2RenderingContext): void {
    if (!this.playing) {
      this.gl = gl;
      this.playing = true;
      this.componentWillBeRenderedFirstTime(gl);

      this.renderLoopID = renderLoop(() => {
        this.clear(gl);
        this.onEachRenderFrame(gl);
        return this.playing;
      });
    } else {
      this.stop();
      this.play(gl);
    }
  }

  stop(): void {
    if (this.playing) {
      this.playing = false;
      window.cancelAnimationFrame(this.renderLoopID);
    }
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
