import { createStore as createReduxStore } from "redux";
import keyboard from "./keyboard";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  keyboard
});

export const createStore = () => createReduxStore(rootReducer, {});
