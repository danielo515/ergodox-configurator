const prefix = "[keyboard]";
export const EDIT_KEY = `${prefix} EDIT_KEY`;
export const EXPORT_LAYOUT = `${prefix} EXPORT_LAYOUT`;

const editKey = payload => ({
  type: EDIT_KEY,
  payload
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
  editKey
};

const twoToOneDimension = rowLen => (col, row) => col + row * rowLen;
const getOr = (src, defVal) => idx => src[idx] || defVal;

const generateLayout = (layoutDescription, keysData) => {
  const translate = twoToOneDimension(layoutDescription[0].length);
  const getKey = getOr(keysData, { label: "KC_TRANSPARENT" });
  return layoutDescription.reduce(
    (res, row, rowIdx) =>
      res +
      (row.reduce((rowKeys, keyType, col) => {
        if (keyType === 0) return rowKeys;
        rowKeys.push(getKey(translate(col, rowIdx)).label);
        return rowKeys;
      }, []) +
        ","),
    ""
  );
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
