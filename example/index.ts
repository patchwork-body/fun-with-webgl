import { World, Scene, Point } from 'webgl-lib';

const world = new World({
  id: 'js-canvas',
  width: 800,
  height: 600,
  clearColor: [0.0, 0.0, 0.0],
  autoResize: true,
});

const scene = new Scene({ name: 'red-point' });
const point = new Point({
  name: 'red-point',
  position: [0.0, 0.0, 0.0],
  size: 10.0,
});

scene.addComponent(point);
world.addScene(scene);
world.startScene('red-point');
