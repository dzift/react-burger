import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_CURRENT_ITEM,
  CLOSE_MODAL,
} from "../actions/BurgerIngredients";

const initialState = {
  items: [],
  currentItem: false,
  loading: false,
  error: false,
};

export const reducerBurgerIngredient = (state = initialState, action) => {
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
    case CLOSE_MODAL:
      return {
        ...state,
        currentItem: false,
      };

    default:
      return state;
  }
};
