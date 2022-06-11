import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  ADD_ITEM_IN_CONSTRUCTOR,
  DEL_ITEM_IN_CONSTRUCTOR,
} from "../actions/burger-constructor";

const initialState = {
  itemConstructor: {
    ingredients: [],
    bun: null,
    draggedIngredient: null,
  },
  orderInfo: false,
  orderItems: [],
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

    default:
      return state;
  }
};
