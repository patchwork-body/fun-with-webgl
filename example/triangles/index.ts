import { World, Scene, Mouse, Triangle } from 'webgl-lib';
import { Vertex } from '../../src/core/utils/vertex';

const initTrianglesGame = (): void => {
  const world = new World({
    name: 'main-world',
    id: 'js-canvas',
    width: 800,
    height: 600,
    clearColor: [0.0, 0.0, 0.0],
    autoResize: true,
  });

  const sceneName = 'triangles';
  const scene = new Scene({ name: sceneName });
  const mouse = new Mouse({ name: 'mouse' });
  const triangle = new Triangle({
    name: 'triangle',
    position: new Float32Array([]),
    color: [1.0, 0.0, 0.0],
  });

  scene.addComponent(triangle);

  world.addComponent(scene);
  world.addComponent(mouse);

  world.startScene(sceneName);
};

export { initTrianglesGame };
