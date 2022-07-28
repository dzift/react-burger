import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  ADD_ITEM_IN_CONSTRUCTOR,
  DEL_ITEM_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  SORT_ITEM_IN_CONSTRUCTOR,
} from "../constants/burger-constructor";
import { TItemObject, TOrderData } from "../../utils/types";

import { TConstructorActions } from "../actions/burger-constructor";

export type TConstructorState = {
  itemConstructor: {
    ingredients: TItemObject[];
    bun: TItemObject | null;
    draggedIngredient: null;
  };
  orderInfo: TOrderData | false;
  orderItems: [];
  posting: boolean;
  postingOrder: boolean;
  error: boolean;
};

const initialState: TConstructorState = {
  itemConstructor: {
    ingredients: [],
    bun: null,
    draggedIngredient: null,
  },
  orderInfo: false,
  orderItems: [],
  posting: true,
  postingOrder: false,
  error: false,
};

export const reducerBurgerConstructor = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        postingOrder: true,
        error: false,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        posting: true,
        error: false,
        orderInfo: action.orderInfo,
      };
    case GET_ORDER_FAILED:
      return {
        ...state,
        posting: true,
        error: true,
      };
    case ADD_ITEM_IN_CONSTRUCTOR:
      const addItem = { ...action.item };
      if (addItem.type === "bun") {
        return {
          ...state,
          itemConstructor: {
            ...state.itemConstructor,
            bun: action.item,
          },
        };
      } else {
        return {
          ...state,
          itemConstructor: {
            ...state.itemConstructor,
            ingredients: [...state.itemConstructor.ingredients, addItem],
          },
        };
      }

    case DEL_ITEM_IN_CONSTRUCTOR:
      return {
        ...state,
        itemConstructor: {
          ...state.itemConstructor,
          ingredients: [...state.itemConstructor.ingredients].filter(
            (item) => item.itemKey !== action.itemKey
          ),
        },
      };
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        itemConstructor: {
          ingredients: [],
          bun: null,
          draggedIngredient: null,
        },
        postingOrder: false,
      };
    case SORT_ITEM_IN_CONSTRUCTOR:
      const ingredients = [...state.itemConstructor.ingredients];
      const dragItem = ingredients[action.moveIndex];
      ingredients.splice(action.moveIndex, 1);
      ingredients.splice(action.hoverIndex, 0, dragItem);
      return {
        ...state,
        itemConstructor: {
          ...state.itemConstructor,
          ingredients: ingredients,
        },
      };

    default:
      return state;
  }
};
