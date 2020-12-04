import { World, Scene, Point, Mouse } from 'webgl-lib';

const initPointClickerGame = (): void => {
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
        size: defineSize(x, y),
        color: defineColor(x, y),
      }),
    );
  });

  const defineSize = (x: number, y: number) => {
    const delimiter = 1 + Math.abs(x) + Math.abs(y);
    return 10.0 / delimiter;
  };

  const defineColor = (x: number, y: number): [number, number, number] => {
    const RED = [1.0, 0.0, 0.0];
    const GREEN = [0.0, 1.0, 0.0];
    const BLUE = [0.0, 0.0, 1.0];
    const YELLOW = [1.0, 1.0, 0.0];

    let color: number[];

    if (x > 0 && y > 0) {
      color = RED;
    } else if (x < 0 && y > 0) {
      color = YELLOW;
    } else if (x > 0 && y < 0) {
      color = GREEN;
    } else {
      color = BLUE;
    }

    return color as [number, number, number];
  };

  world.startScene('red-point-scene');
};

export { initPointClickerGame };
