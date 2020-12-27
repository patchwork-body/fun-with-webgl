import { createTranslateMatrix } from '../translate';
import { Vector4 } from '../vector';

describe('Matrix4 tests', () => {
  it('should multiply() matrices', () => {
    const matA = createTranslateMatrix();
    const matB = createTranslateMatrix(1.0, 0.5);

    const resultMat = matA.multiply(matB);

    expect(resultMat.row(3).asArray()).toEqual(new Vector4(1.0, 0.5).asArray());
  });
});
