import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../constants/burger-Ingredients";

const initialState = {
  items: [],
  loading: false,
  error: false,
};

export const reducerBurgerIngredients = (state = initialState, action) => {
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

    default:
      return state;
  }
};
