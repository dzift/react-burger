import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_CURRENT_ITEM,
  CLEAR_ITEM,
} from "../constants/burger-Ingredients";
import { items } from "../../utils/data";

import { initialState } from "./burger-Ingredients";

import { reducerBurgerIngredients } from "./burger-Ingredients";

const ingredientsData = {
  items: [],
  loading: false,
  error: false,
  currentItem: false,
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
    expect(reducerBurgerIngredients(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      reducerBurgerIngredients(initialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...ingredientsData,
        loading: true,
      })
    );
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      reducerBurgerIngredients(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        items: items,
      })
    ).toEqual(
      expect.objectContaining({
        ...ingredientsData,
        items: items,
      })
    );
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      reducerBurgerIngredients(initialState, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...ingredientsData,
        loading: true,
        error: true,
      })
    );
  });

  it("should handle GET_CURRENT_ITEM", () => {
    expect(
      reducerBurgerIngredients(initialState, {
        type: GET_CURRENT_ITEM,
        currentItem: items[0],
      })
    ).toEqual(
      expect.objectContaining({
        ...ingredientsData,
        currentItem: items[0],
      })
    );
  });

  it("should handle CLEAR_ITEM", () => {
    expect(
      reducerBurgerIngredients(initialState, {
        type: CLEAR_ITEM,
        currentItem: false,
      })
    ).toEqual(
      expect.objectContaining({ ...ingredientsData, currentItem: false })
    );
  });
});
