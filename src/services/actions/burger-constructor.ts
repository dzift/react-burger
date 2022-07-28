import { postIngredients } from "../../utils/burger-api";
import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  ADD_ITEM_IN_CONSTRUCTOR,
  DEL_ITEM_IN_CONSTRUCTOR,
  SORT_ITEM_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
} from "../constants/burger-constructor";
import {
  TOrderData,
  TItemObject,
  AppDispatch,
  AppThunk,
} from "../../utils/types";

// Типизация экшенов
export interface IGetOrderRequestActions {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessActions {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderInfo: TOrderData;
}

export interface IGetOrderFailedActions {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IAddItemInConstructorActions {
  readonly type: typeof ADD_ITEM_IN_CONSTRUCTOR;
  readonly item: TItemObject;
}

export interface IDelItemInConstructorActions {
  readonly type: typeof DEL_ITEM_IN_CONSTRUCTOR;
  readonly item: TItemObject;
  itemKey: string;
}
export interface ISortItemInConstructorActions {
  readonly type: typeof SORT_ITEM_IN_CONSTRUCTOR;
  moveIndex: number;
  hoverIndex: number;
}

export interface IClearConstructorActions {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
  | IGetOrderRequestActions
  | IGetOrderSuccessActions
  | IGetOrderFailedActions
  | IAddItemInConstructorActions
  | IDelItemInConstructorActions
  | ISortItemInConstructorActions
  | IClearConstructorActions;

export const postItems: AppThunk = (orderItems: Array<string>) => {
  return function (dispatch: AppDispatch) {
    postIngredients(orderItems)
      .then((result) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderInfo: result,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};
