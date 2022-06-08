import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_CURRENT_ITEM,
  CLEAR_ITEM,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
} from "../actions/burger-Ingredients";

const initialState = {
  items: [],
  currentItem: false,
  orderInfo: false,
  loading: false,
  posting: false,
  error: false,
  modalVisiable: false,
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
    case OPEN_MODAL:
      return {
        ...state,
        modalVisiable: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalVisiable: false,
      };

    default:
      return state;
  }
};
