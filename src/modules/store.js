import { createStore as createReduxStore } from "redux";
import keyboard from "./keyboard/reducer";
import ui from "./ui";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  keyboard,
  ui
});

export const createStore = () => {
  const windowGlobal = typeof window !== "undefined" && window;

  const devtools =
    process.env.NODE_ENV === "development" && windowGlobal.devToolsExtension
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f;
  return createReduxStore(rootReducer, {}, devtools);
};
