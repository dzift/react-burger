import { Location } from "history";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { TConstructorActions } from "../services/actions/burger-constructor";
import { TIngredientsActions } from "../services/actions//burger-Ingredients";
import { TAuthorizationActions } from "../services/actions/authorization";
import { TOrderWsAction } from "../services/actions/ws-orders";
import { rootReducer } from "../services/reducers/app";

import { store } from "../services/store";

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions =
  | TAuthorizationActions
  | TConstructorActions
  | TIngredientsActions
  | TOrderWsAction;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

export type TLocataionState = {
  background: Location;
  from: Location;
};

export type TItemObject = {
  itemKey?: any;
  index?: any;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
};

export type TItemMobile = {
  image_mobile: string;
  name: string;
  price: number;
};

export type TIngredientsData = {
  success: boolean;
  data: TItemObject[];
};

export type TUserData = {
  user: { email: string; name: string };
  accessToken: string;
  refreshToken: string;
  success: boolean;
};
export type TUser = {
  name: string;
  email: string;
  password?: string | undefined;
};

export type TOrderData = {
  name: string;
  success: boolean;
  order: { number: number };
};

export type TApiData = {
  message: string;
  success: boolean;
};

export type TCookieProps = {
  expires?: number | string;
  path?: string;
} & { [extraParams: string]: string | number | boolean };

export type TOrder = {
  success: boolean;
  orders: Array<TOrderItem>;
  total: number;
  totalToday: number;
};

export enum WebSocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type TOrderItem = {
  ingredients: string[];
  _id?: string;
  name: string;
  status?: string;
  number: number;
  createdAt: string;
  updatedAt?: Date;
  price?: number;
  __v?: number;
};
