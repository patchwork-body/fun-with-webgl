import { World, Scene, Mouse } from 'webgl-lib';

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

  world.addComponent(scene);
  world.addComponent(mouse);

  // mouse.register((x, y) => {
  // });

  world.startScene(sceneName);
};

export { initTrianglesGame };
