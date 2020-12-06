import { initPointClickerGame } from './point_clicker';
import { initTrianglesGame } from './triangles';
import { initRectangleGame } from './rectangle';

switch (document.title) {
  case 'Point Clicker':
    initPointClickerGame();
    break;
  case 'Triangles':
    initTrianglesGame();
    break;
  case 'Rectangle':
    initRectangleGame();
    break;
  default:
    break;
}
