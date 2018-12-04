const prefix = "[keyboard]";
export const EDIT_KEY = `${prefix} EDIT_KEY`;

const editKey = payload => ({
  type: EDIT_KEY,
  payload
});

const leftLayout = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 2],
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 2],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 3, 3, 1]
];

const rightLayout = [
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
  left: leftLayout,
  right: rightLayout,
  rowLn: leftLayout[0].length
};

const initialState = {
  keys: [],
  layout
};

export const actions = {
  editKey
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_KEY:
      const { row, col } = payload;
      return {
        ...state,
        keys: ((state.keys[row * state.layout.rowLn + col] = "EDITED"),
        state.keys)
      };

    default:
      return state;
  }
};
