import { World, Scene, Mouse, Rectangle } from 'webgl-lib';
import { Vector4 } from '../../src/utils/vector';

const initRectangleGame = (): void => {
  const world = new World({
    name: 'main-world',
    domElementID: 'js-canvas',
    width: 800,
    height: 600,
    clearColor: [0.0, 0.0, 0.0],
    autoResize: true,
  });

  const sceneName = 'rectangle-example';
  const scene = new Scene({ name: sceneName });
  const mouse = new Mouse({ name: 'mouse' });

  const rect = new Rectangle({
    name: 'rectangle',
    position: new Vector4(),
    color: new Vector4(1.0),
    size: 10,
  });

  scene.attachChildComponent(rect);

  world.attachChildComponent(scene);
  world.attachChildComponent(mouse);

  world.startScene(sceneName);
};

export { initRectangleGame };
