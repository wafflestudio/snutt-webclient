import { complement } from './timemask';

describe('utils', () => {
  describe('timemask', () => {
    describe('complement', () => {
      it('should return inverse of a single timemask', () => {
        const masks = [[0, 0, 0, 0, 0, 0, 0]];
        const complemented = complement(masks);
        const thirtyBitOnes = 2 ** 30 - 1;
        expect(complemented).toEqual(new Array(7).fill(thirtyBitOnes));
      });

      it('should return inverse of a multiple timemasks', () => {
        const masks = [[0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1]];
        const complemented = complement(masks);
        const twentynineOnesAndOneZero = 2 ** 30 - 1 - 1;
        expect(complemented).toEqual(
          new Array(7).fill(twentynineOnesAndOneZero),
        );
      });

      it('should throw error when the length of a mask is not 7', () => {
        const masks = [new Array(7).fill(0), new Array(6).fill(1)];
        expect(() => {
          complement(masks);
        }).toThrow();
      });
    });
  });
});
