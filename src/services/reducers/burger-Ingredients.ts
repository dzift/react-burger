import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_CURRENT_ITEM,
  CLEAR_ITEM,
} from "../constants/burger-Ingredients";

import { TIngredientsActions } from "../actions/burger-Ingredients";
import { TItemObject } from "../../utils/types";

export type IIngredientState = {
  items: TItemObject[];
  currentItem: boolean;
  loading: boolean;
  error: boolean;
};

const initialState: IIngredientState = {
  items: [],
  loading: false,
  error: false,
  currentItem: false,
};

export const reducerBurgerIngredients = (
  state = initialState,
  action: TIngredientsActions
): IIngredientState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        items: action.items,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        loading: true,
        error: true,
      };
    case GET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.currentItem,
      };
    case CLEAR_ITEM:
      return {
        ...state,
        currentItem: false,
      };

    default:
      return state;
  }
};
