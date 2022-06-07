import { createStore } from "redux";
import { rootReducer } from "./reducers/app";
import { composeWithDevTools } from "redux-devtools-extension";

export const configurStore = (initialState) => {
  const store = createStore(rootReducer, initialState, composeWithDevTools());
  return store;
};
