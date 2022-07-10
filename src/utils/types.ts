import { Location } from "history";

export type TLocataionState = {
  background: Location;
  from: Location;
};

export type TItemObject = {
  itemKey: any;
  index: any;
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
};

export type TItemMobile = {
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
};
