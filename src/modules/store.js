import { createStore as createReduxStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

import keyboard from "./keyboard/reducer";
import ui from "./ui";

const getDevTools = window =>
  process.env.NODE_ENV === "development" && window.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

const rootReducer = combineReducers({
  keyboard,
  ui
});

const persistConfig = {
  key: "root",
  blacklist: ["ui"],
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
  const windowGlobal = typeof window !== "undefined" && window;
  const store = createReduxStore(
    persistedReducer,
    {},
    getDevTools(windowGlobal)
  );
  return {
    store,
    persistor: persistStore(store)
  };
};
