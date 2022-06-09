import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  ADD_ITEM_FOR_CONSTRUCTOR,
} from "../actions/burger-constructor";

const initialState = {
  itemConstructor: {
    bun: null,
    ingredients: [],
  },
  orderInfo: false,
  posting: false,
};

export const reducerBurgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        posting: true,
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
    case ADD_ITEM_FOR_CONSTRUCTOR:
      const bun = action.item;
      if (bun.type === "bun") {
        return {
          ...state,
          itemConstructor: {
            ...state.itemConstructor,
            bun: action.item,
          },
        };
      }
      const item = action.item;
      return {
        ...state,
        itemConstructor: {
          ...state.itemConstructor,
          ingredients: [...state.itemConstructor.ingredients, item],
        },
      };
    default:
      return state;
  }
};
