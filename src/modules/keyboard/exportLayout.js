const twoToOneDimension = rowLen => (col, row) => col + row * rowLen;
const getOr = (src, defVal) => idx => src[idx] || defVal;
/*
( a -> m ) -> [a] -> m
 takes a function and uses it to reduce an array.
 Returned values will be concatenated, falsy values will be skipped
*/
const flatMap = fn => arr =>
  arr.reduce((acc, x, idx) => {
    const val = fn(x, idx);
    return val ? acc.concat(val) : acc;
  }, []);
/**
 * Takes a layout and an object containing actual keys data and generates a string representation that can be pasted
 * into QMK. Zeroes on the layout will be skipped as they represent empty space.
 * When a key is not defined on the layer then KC_TRANSPARENT will be used as default
 * @param {Array<Array<Number>>} layoutDescription an array of arrays with integers describing the layout
 * @param {Object} keysData map of key IDs to their desired configuration
 */
export const generateLayout = (layoutDescription, keysData) => {
  const translate = twoToOneDimension(layoutDescription[0].length);
  const getKey = getOr(keysData, { value: "KC_TRANSPARENT" });
  // Using our flatMap is key because it skips falsy values
  const compiledLayout = flatMap((row, rowIdx) =>
    flatMap((keyType, col) =>
      keyType !== 0 ? getKey(translate(col, rowIdx)).value : ""
    )(row).join()
  )(layoutDescription);
  return compiledLayout.join(", \n");
};
