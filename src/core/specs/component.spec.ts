import { BaseComponent } from '../component';

describe('RenderComponent tests', () => {
  describe('getRootComponent()', () => {
    const group = 'test';
    let root: BaseComponent<unknown, unknown>;
    let childA: BaseComponent<unknown, unknown>;
    let childB: BaseComponent<unknown, unknown>;

    beforeEach(() => {
      root = new BaseComponent({ name: 'root', group });
      childA = new BaseComponent({ name: 'childA', group });
      childB = new BaseComponent({ name: 'childB', group });
    });

    it('should return component with no parent attached', () => {
      const noParentTest = () => {
        expect(root.getRootComponent().hasParent).toBeFalsy();
        expect(childA.getRootComponent().hasParent).toBeFalsy();
        expect(childB.getRootComponent().hasParent).toBeFalsy();
      };

      noParentTest();

      root.attachChildComponent(childA);
      noParentTest();

      root.attachChildComponent(childB);
      noParentTest();

      root.detachChildComponent(childA.name);
      noParentTest();

      root.detachChildComponent(childB.name);
      noParentTest();
    });
  });
});
