import { getIngredients } from "../../utils/burger-api";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_CURRENT_ITEM,
  CLEAR_ITEM,
} from "../constants/burger-Ingredients";
import { TItemObject } from "../../utils/types";

// Типизация экшенов
export interface IGetIngredientsRequestActions {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessActions {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: Array<TItemObject>;
}

export interface IGetIngredientsFailedActions {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetCurrentItemActions {
  readonly type: typeof GET_CURRENT_ITEM;
}
export interface IClearItemActions {
  readonly type: typeof CLEAR_ITEM;
}

export type TIngredientsActions =
  | IGetIngredientsRequestActions
  | IGetIngredientsSuccessActions
  | IGetIngredientsFailedActions
  | IGetCurrentItemActions
  | IClearItemActions;

export const getItem: any = () => {
  return function (dispatch: any) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredients()
      .then((result) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: result.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};
