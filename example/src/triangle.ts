import { World, Scene, Mouse, Triangle } from 'webgl-lib';
import { Vector4 } from '../../src/utils/vector';

const initTrianglesGame = (): void => {
  const world = new World({
    name: 'main-world',
    domElementID: 'js-canvas',
    width: 800,
    height: 600,
    clearColor: [0.0, 0.0, 0.0],
    autoResize: true,
  });

  const sceneName = 'triangles';
  const scene = new Scene({ name: sceneName });
  const mouse = new Mouse({ name: 'mouse' });

  const gTriangle = new Triangle({
    name: 'green-triangle',
    position: new Vector4(),
    color: new Vector4(0.4, 1.0),
    size: 15,
  });

  const rTriangle = new Triangle({
    name: 'red-triangle',
    position: new Vector4(0.5),
    color: new Vector4(1.0),
    size: 4,
  });

  scene.attachChildComponent(gTriangle);
  scene.attachChildComponent(rTriangle);

  world.attachChildComponent(scene);
  world.attachChildComponent(mouse);

  world.startScene(sceneName);
};

export { initTrianglesGame };
