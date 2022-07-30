import { WebSocketStatus, TOrder } from "../../utils/types";
import { createReducer } from "@reduxjs/toolkit";
import {
  connect,
  disconnect,
  wsOpen,
  wsClose,
  wsError,
  wsGetMessage,
} from "../actions/ws-orders";

export type WsOrdersStore = {
  status: WebSocketStatus;
  data: TOrder | null;
  error: string;
};

const initialState: WsOrdersStore = {
  status: WebSocketStatus.OFFLINE,
  data: null,
  error: "",
};

export const wsOrderReducer = createReducer(initialState, (builder) => {
  builder.addCase(connect, (state) => {
    state.status = WebSocketStatus.CONNECTING;
  });
  builder.addCase(disconnect, (state) => {
    state.status = WebSocketStatus.OFFLINE;
  });
  builder.addCase(wsOpen, (state) => {
    state.status = WebSocketStatus.ONLINE;
    state.error = "";
  });
  builder.addCase(wsClose, (state) => {
    state.status = WebSocketStatus.OFFLINE;
  });
  builder.addCase(wsError, (state, action) => {
    state.status = WebSocketStatus.OFFLINE;
    state.error = action.payload;
  });
  builder.addCase(wsGetMessage, (state, action) => {
    state.status = WebSocketStatus.OFFLINE;
    state.data = action.payload;
  });
});
