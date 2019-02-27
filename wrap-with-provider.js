import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "./src/modules/store";

const { store, persistor } = createStore();

export default ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={"Come polla puto"} persistor={persistor}>
      {element}
    </PersistGate>
  </Provider>
);
