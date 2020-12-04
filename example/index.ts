import { World, Scene, Point, Mouse } from 'webgl-lib';

const world = new World({
  name: 'main-world',
  id: 'js-canvas',
  width: 800,
  height: 600,
  clearColor: [0.0, 0.0, 0.0],
  autoResize: true,
});

let index = 0;

const scene = new Scene({ name: 'red-point-scene' });
const mouse = new Mouse({ name: 'mouse' });

world.addComponent(scene);
world.addComponent(mouse);

mouse.register((x, y) => {
  scene.addComponent(
    new Point({
      name: `red-point-${++index}`,
      position: [x, y, 0.0],
      size: 10.0,
    }),
  );
});

world.startScene('red-point-scene');
