import { keyCodes } from "./keyDefinitions";
import { parseLayout, keysToLayout } from "./parseLayout";
import { generateLayout } from "./exportLayout";
import dryRedux from "../redux-dry";
import { ergodox } from "./layoutDescription";

const layout = {
  description: ergodox,
  split: true,
  rowLn: ergodox[0].length
};

const initialState = {
  editing: false,
  editingId: null,
  exportIsOpen: false,
  exported: "",
  keys: {},
  layout
};

const { actionCreators: actions, reducer } = dryRedux(
  "[keyboard] ",
  initialState,
  {
    SET_KEY: (state, { payload: { id, key } }) => ({
      ...state,
      editing: false,
      keys: { ...state.keys, [id]: key }
    }),
    EDIT_KEY: (state, { payload: { id } }) => ({
      ...state,
      editing: true,
      editingId: id
    }),
    EXPORT_LAYOUT: state => ({
      ...state,
      exported: generateLayout(state.layout.description, state.keys),
      exportIsOpen: true
    }),
    EXPORT_CLOSE: state => ({
      ...state,
      exportIsOpen: false
    }),
    IMPORT_LAYOUT: (state, { payload }) => ({
      ...state,
      keys: keysToLayout(state.layout.description)(
        parseLayout(keyCodes)(payload)
      )
    })
  }
);

export { actions, reducer as default };
