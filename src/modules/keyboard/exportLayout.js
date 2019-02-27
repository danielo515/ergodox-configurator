import { splitKeysRegex } from "./parseLayout";
import { getOr, flatMap, adjustStrTo } from "../util";
const twoToOneDimension = rowLen => (col, row) => col + row * rowLen;
/**
 * Takes a layout and an object containing actual keys data and generates a string representation that can be pasted
 * into QMK. Zeroes on the layout will be skipped as they represent empty space.
 * When a key is not defined on the layer then KC_TRANSPARENT will be used as default
 * @param {Array<Array<Number>>} layoutDescription an array of arrays with integers describing the layout
 * @param {Object} keysData map of key IDs to their desired configuration
 */
export const generateLayout = (layoutDescription, keysData) => {
  const translate = twoToOneDimension(layoutDescription[0].length);
  const getKey = getOr(keysData, { value: "KC_TRANSPARENT" }, x => x.value);
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
