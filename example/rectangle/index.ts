import { World, Scene, Mouse, Rectangle } from 'webgl-lib';

const initRectangleGame = (): void => {
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

  const triangle = new Rectangle({
    name: 'rectangle',
    position: new Float32Array([-0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5]),
    color: [1.0, 0.0, 0.0],
  });

  scene.addComponent(triangle);

  world.addComponent(scene);
  world.addComponent(mouse);

  world.startScene(sceneName);
};

export { initRectangleGame };
