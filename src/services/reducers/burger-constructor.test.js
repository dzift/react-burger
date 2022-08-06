import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
} from "../constants/burger-constructor";

import { initialState } from "./burger-constructor";

import { reducerBurgerConstructor } from "./burger-constructor";

const constructorData = {
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

describe("Redux store and actions", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ result: "OK" }),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state cnstr", () => {
    expect(reducerBurgerConstructor(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ORDER_REQUEST", () => {
    expect(
      reducerBurgerConstructor(initialState, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({ ...constructorData, postingOrder: true })
    );
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(
      reducerBurgerConstructor(initialState, {
        type: GET_ORDER_SUCCESS,
        orderInfo: [test],
      })
    ).toEqual(
      expect.objectContaining({
        ...constructorData,
        orderInfo: [test],
      })
    );
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(
      reducerBurgerConstructor(initialState, {
        type: GET_ORDER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...constructorData,
        error: true,
      })
    );
  });
});
