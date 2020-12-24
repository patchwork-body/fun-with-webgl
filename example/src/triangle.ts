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

  console.log('create triangle');
  const triangle = new Triangle({
    name: 'triangle',
    position: new Vector4(),
    color: new Vector4(1.0),
    size: 10,
  });

  console.log('attacing triangle');
  scene.attachChildComponent(triangle);

  console.log('attacing scene');
  world.attachChildComponent(scene);
  world.attachChildComponent(mouse);

  console.log('scene start');
  world.startScene(sceneName);
};

export { initTrianglesGame };
