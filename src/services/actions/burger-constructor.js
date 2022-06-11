import { postIngredients } from "../../utils/burger-api";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const ADD_ITEM_IN_CONSTRUCTOR = "ADD_ITEM_IN_CONSTRUCTOR";
export const DEL_ITEM_IN_CONSTRUCTOR = "DEL_ITEM_IN_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const postItems = (orderItems) => {
  return function (dispatch) {
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
