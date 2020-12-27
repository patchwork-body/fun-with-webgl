import { World, Scene, Triangle, Rectangle, Vector4 } from 'webgl-lib';

const world = new World({
  name: 'main-world',
  domElementID: 'js-canvas',
  width: 800,
  height: 600,
  clearColor: [0.0, 0.0, 0.0],
  autoResize: true,
});

const triangleScene = new Scene({ name: 'triangle' });

const triangle = new Triangle({
  name: 'green-triangle',
  position: new Vector4(),
  color: new Vector4(0.4, 1.0),
  size: 200,
});

triangleScene.attachChildComponent(triangle);

const rectangleScene = new Scene({ name: 'rectangle' });

const rectangle = new Rectangle({
  name: 'orange-rect',
  position: new Vector4(),
  color: new Vector4(1.0, 0.7),
  size: 200,
  angle: 45,
});

rectangleScene.attachChildComponent(rectangle);

world.attachChildComponent(triangleScene);
world.attachChildComponent(rectangleScene);

document.getElementById('triangle')?.addEventListener('click', () => {
  world.startScene('triangle');
});

document.getElementById('rect')?.addEventListener('click', () => {
  world.startScene('rectangle');
});

document.getElementById('rotation')?.addEventListener('input', event => {
  const element = event.target as HTMLInputElement;
  triangle.rotate(parseInt(element.value));
});

document.getElementById('translateX')?.addEventListener('input', event => {
  const element = event.target as HTMLInputElement;
  triangle.translate(parseFloat(element.value), 0.0);
});

document.getElementById('translateY')?.addEventListener('input', event => {
  const element = event.target as HTMLInputElement;
  triangle.translate(0.0, parseFloat(element.value));
});
