import { Vector4 } from '../vector';

describe('Vector4 tests', () => {
  it('should multiply() vectors', () => {
    const vecA = new Vector4(1.0, 0.0, 0.0, 0.0);
    const vecB = new Vector4(0.5, 0.0, 0.0, 0.0);

    const result = vecA.multiply(vecB);

    expect(result).toEqual(0.5);
  });
});
