import { compose, createStore, applyMiddleware } from "redux";
import {
  connect as OrderWsConnect,
  disconnect as OrderWsDisconnect,
  wsConnecting as OrderWsConnecting,
  wsOpen as OrderWsOpen,
  wsClose as OrderWsClose,
  wsGetMessage as OrderWsGetMessage,
  wsError as OrderWsError,
  wsSendMessage as OrderWsSendMessage,
} from "./actions/ws-orders";

import thunk from "redux-thunk";
import { rootReducer } from "./reducers/app";
import { socketMiddleware } from "./middleware/socket-middleware";
import type {} from "redux-thunk/extend-redux";

const wsActions = {
  wsConnect: OrderWsConnect,
  wsDisconnect: OrderWsDisconnect,
  wsConnecting: OrderWsConnecting,
  onOpen: OrderWsOpen,
  onClose: OrderWsClose,
  onError: OrderWsError,
  onMessage: OrderWsGetMessage,
  wsSendMessage: OrderWsSendMessage,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);
export const store = createStore(rootReducer, enhancer);
