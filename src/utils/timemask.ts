export const complement = (masks: Array<Array<number>>): number[] => {
  const union = masks.reduce(
    (prev, current) => {
      if (current.length != 7) {
        throw new Error();
      }
      return current.map((val, index) => val | prev[index]);
    },
    [0, 0, 0, 0, 0, 0, 0],
  );
  const inversed = union.map(val => ~val);
  // Our mask has 30 bits, and `inversed` has two unnecessary 1 at its head
  const ret = inversed.map(val => (val << 2) >>> 2);
  return ret;
};
