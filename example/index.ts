import { initPointClickerGame } from './point_clicker';
import { initTrianglesGame } from './triangles';

switch (document.title) {
  case 'Point Clicker':
    initPointClickerGame();
    break;
  case 'Triangles':
    initTrianglesGame();
    break;
  default:
    break;
}
