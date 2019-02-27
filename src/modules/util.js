import pipe from "../macros/pipe.macro";
/**
 * @function getOr
 * @param  {Array/Object} src    The object or array you want to extract props from
 * @param  {any} defVal the default value to use in case of getting an undefined
 * @param  {Function} predicate an extra validation step that decides if the found value is valid or not
 * @param  {String/Number} idx the index to extract
 * @return {any} the value at idx or the default value
 */
export const getOr = (src, defVal, predicate = () => true) => idx => {
  const val = src[idx];
  return val && predicate(val) ? val : defVal;
};
/*
( a -> m ) -> [a] -> m
 takes a function and uses it to reduce an array.
 Returned values will be concatenated, falsy values will be skipped
*/
export const flatMap = fn => arr =>
  arr.reduce((acc, x, idx) => {
    const val = fn(x, idx);
    return val ? acc.concat(val) : acc;
  }, []);
// given a length adjust the string to have at least that length filling with spaces at the end
export const adjustStrTo = ln => str => str.padEnd(ln, " ");
export const map = fn => arr => (arr || []).map(fn);

const puto = pipe(
  map(x => x.pene),
  x => x + 1,
  x => x * 2
);
