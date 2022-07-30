import { createAction } from "@reduxjs/toolkit";
import { TOrder } from "../../utils/types";

export const connect = createAction<string, "WS_ORDER_CONNECT">(
  "WS_ORDER_CONNECT"
);
export const disconnect = createAction("WS_ORDER_DISCONNECT");
export const wsConnecting = createAction("WS_ORDER_WS_CONNECTING");
export const wsOpen = createAction("ORDER_WS_SUCCESS");
export const wsError = createAction<string, "ORDER_WS_ERROR">("ORDER_WS_ERROR");
export const wsClose = createAction("ORDER_WS_CLOSE");
export const wsGetMessage = createAction<TOrder, "GET_ORDER_WS_MESSAGE">(
  "GET_ORDER_WS_MESSAGE"
);
export const wsSendMessage = createAction<string, "SEND_ORDER_WS_MESSAGE">(
  "SEND_ORDER_WS_MESSAGE"
);

export type TOrderWsAction =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsGetMessage>
  | ReturnType<typeof wsSendMessage>;
