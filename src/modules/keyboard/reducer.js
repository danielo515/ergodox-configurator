import { keyCodes } from "./keyDefinitions";

const prefix = "[keyboard]";
export const EDIT_KEY = `${prefix} EDIT_KEY`;
export const EXPORT_LAYOUT = `${prefix} EXPORT_LAYOUT`;
export const EXPORT_CLOSE = `${prefix} EXPORT_CLOSE`;
export const SET_KEY = `${prefix} SET_KEY`;

const editKey = payload => ({
  type: EDIT_KEY,
  payload
});

const exportLayout = _ => ({
  type: EXPORT_LAYOUT
});
const setKey = payload => ({
  type: SET_KEY,
  payload
});

const closeExport = _ => ({
  type: EXPORT_CLOSE
});

export const actions = {
  editKey,
  exportLayout,
  closeExport,
  setKey
};

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
  editing: false,
  editingId: null,
  exportIsOpen: false,
  exported: "",
  keys: {},
  layout
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
  const getKey = getOr(keysData, { value: "KC_TRANSPARENT" });
  const compiledLayout = flatMap((row, rowIdx) =>
    flatMap((keyType, col) =>
      keyType !== 0 ? getKey(translate(col, rowIdx)).value : ""
    )(row).join()
  )(layoutDescription);
  return compiledLayout.join(", \n");
};

export default (state = initialState, { type, payload = {} }) => {
  const { id, key, params } = payload;
  switch (type) {
    case SET_KEY:
      return {
        ...state,
        editing: false,
        keys: { ...state.keys, [id]: key }
      };
    case EDIT_KEY:
      return {
        ...state,
        editing: true,
        editingId: id
      };
    case EXPORT_LAYOUT:
      return {
        ...state,
        exported: generateLayout(state.layout.description, state.keys),
        exportIsOpen: true
      };
    case EXPORT_CLOSE:
      return {
        ...state,
        exportIsOpen: false
      };

    default:
      return state;
  }
};
