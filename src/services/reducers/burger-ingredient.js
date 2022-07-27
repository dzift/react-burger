import { GET_CURRENT_ITEM, CLEAR_ITEM } from "../constants/burger-Ingredients";

const initialState = {
  currentItem: false,
};

export const reducerBurgerIngredient = (state = initialState, action) => {
  switch (action.type) {
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
