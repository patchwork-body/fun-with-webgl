import { Component } from '../component';
import { World } from '../world';

class Mouse extends Component {
  public parent: World | null = null;

  register(cb: (x: number, y: number) => void): void {
    this.parent?.canvasElement.addEventListener(
      'click',
      (event: MouseEvent) => {
        const [x, y] = this.click(event);
        cb(x, y);
      },
    );
  }

  click(event: MouseEvent): [number, number] {
    const x = event.clientX;
    const y = event.clientY;

    const targetElement = event.target as HTMLElement;

    const clientRect = targetElement.getBoundingClientRect();

    const relativeX = x - clientRect.x;
    const relativeY = y - clientRect.y;

    const ratioX =
      (relativeX - targetElement.clientWidth / 2) /
      (targetElement.clientWidth / 2);

    const ratioY =
      (targetElement.clientHeight / 2 - relativeY) /
      (targetElement.clientHeight / 2);

    return [ratioX, ratioY];
  }
}

export { Mouse };
