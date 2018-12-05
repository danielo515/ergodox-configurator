const prefix = "[keyboard]";
export const EDIT_KEY = `${prefix} EDIT_KEY`;
export const EXPORT_LAYOUT = `${prefix} EXPORT_LAYOUT`;

const editKey = payload => ({
  type: EDIT_KEY,
  payload
});

const exportLayout = _ => ({
  type: EXPORT_LAYOUT
});

const layoutDescription = [
  // Left hand
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 2],
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 2],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 3, 3, 1],
  // Right hand
  [1, 1, 1, 1, 1, 1, 1],
  [2, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1],
  [2, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0],
  [1, 3, 3, 0, 0, 0, 0]
];

const layout = {
  description: layoutDescription,
  split: true,
  rowLn: layoutDescription[0].length
};

const initialState = {
  keys: {},
  layout
};

export const actions = {
  editKey,
  exportLayout
};

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
 * @param {Array<Array<Number>>} layoutDescription an array of arrays with integers describing the layout
 * @param {Object} keysData map of key IDs to their desired configuration
 */
const generateLayout = (layoutDescription, keysData) => {
  const translate = twoToOneDimension(layoutDescription[0].length);
  const getKey = getOr(keysData, { label: "KC_TRANSPARENT" });
  const compiledLayout = flatMap((row, rowIdx) =>
    flatMap((keyType, col) =>
      keyType !== 0 ? getKey(translate(col, rowIdx)).label : ""
    )(row)
  )(layoutDescription);
  return compiledLayout.join();
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_KEY:
      const { id } = payload;
      return {
        ...state,
        keys: { ...state.keys, [id]: { label: "EDITED" } }
      };
    case EXPORT_LAYOUT:
      console.log(generateLayout(state.layout.description, state.keys));
      return state;

    default:
      return state;
  }
};
