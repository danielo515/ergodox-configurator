import { keyCodes } from "./keyDefinitions";
import { parseLayout, keysToLayout } from "./parseLayout";
import { generateLayout } from "./exportLayout";

const prefix = "[keyboard]";
const EDIT_KEY = `${prefix} EDIT_KEY`;
const EXPORT_LAYOUT = `${prefix} EXPORT_LAYOUT`;
const EXPORT_CLOSE = `${prefix} EXPORT_CLOSE`;
const SET_KEY = `${prefix} SET_KEY`;
const IMPORT = `${prefix} IMPORT`;

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

const importLayout = str => ({
  type: IMPORT,
  payload: str
});

export const actions = {
  editKey,
  exportLayout,
  importLayout,
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
    case IMPORT:
      return {
        ...state,
        keys: keysToLayout(state.layout.description)(
          parseLayout(keyCodes)(payload)
        )
      };

    default:
      return state;
  }
};
