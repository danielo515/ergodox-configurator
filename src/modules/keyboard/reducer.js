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
  activeLayer: 0,
  layersCount: 1,
  exported: "",
  keys: { 0: {} },
  layout
};

const { actionCreators: actions, reducer } = dryRedux(
  "[keyboard] ",
  initialState,
  {
    SET_KEY: (state, { payload: { id, key } }) => ({
      ...state,
      editing: false,
      keys: {
        ...state.keys,
        [state.activeLayer]: { ...state.keys[state.activeLayer], [id]: key }
      }
    }),
    EDIT_KEY: (state, { payload: { id } }) => ({
      ...state,
      editing: true,
      editingId: id
    }),
    CREATE_LAYER: state => ({
      ...state,
      keys: { ...state.keys, [state.layersCount]: {} },
      layersCount: state.layersCount + 1
    }),
    SELECT_LAYER: (state, { payload }) => ({
      ...state,
      activeLayer: payload >= state.layersCount ? 0 : payload
    }),
    EXPORT_LAYOUT: state => ({
      ...state,
      exported: generateLayout(
        state.layout.description,
        state.keys[state.activeLayer]
      ),
      exportIsOpen: true
    }),
    EXPORT_CLOSE: state => ({
      ...state,
      exportIsOpen: false
    }),
    IMPORT_LAYOUT: (state, { payload }) => ({
      ...state,
      keys: {
        ...state.keys,
        [state.activeLayer]: keysToLayout(state.layout.description)(
          parseLayout(keyCodes)(payload)
        )
      }
    })
  }
);

export { actions, reducer as default };
