import { splitKeysRegex } from "./parseLayout";
const twoToOneDimension = rowLen => (col, row) => col + row * rowLen;
/**
 * @function getOr
 * @param  {Array/Object} src    The object or array you want to extract props from
 * @param  {any} defVal the default value to use in case of getting an undefined
 * @param  {String/Number} idx the index to extract
 * @return {any} the value at idx or the default value
 */
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
// given a length adjust the string to have at least that length filling with spaces at the end
const adjustStrTo = ln => str => str.padEnd(ln, " ");
const map = fn => arr => (arr || []).map(fn);
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
  let longestKc = 0; // wee need to register the longest key code in order to align them later
  // Using flatMap is key because it skips falsy values
  const compiledLayout = flatMap((row, rowIdx) =>
    flatMap((keyType, col) => {
      // this was previously a one liner, but in order to register the longer string we need to make use of some uglier code
      const res = keyType !== 0 ? getKey(translate(col, rowIdx)).value : "";
      longestKc = res.length > longestKc ? res.length : longestKc;
      return res;
    })(row).join()
  )(layoutDescription);
  const adjust = adjustStrTo(longestKc);
  return compiledLayout
    .map(str =>
      str
        .split(splitKeysRegex) // this may seem wasteful, but doing it other way complicated the logic too much for very little gain
        .map(adjust)
        .join()
    )
    .join(", \n");
};
