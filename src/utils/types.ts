import { Location } from "history";

export type TLocataionState = {
  background: Location;
  from: Location;
};

export type TItemObject = {
  itemKey?: any;
  index?: any;
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

export type TIngredientsData = {
  success: boolean;
  data: TItemObject[];
};

export type TUserData = {
  user: { email: string; name: string };
  accessToken: string;
  refreshToken: string;
  success: boolean;
};

export type TOrderData = {
  name: string;
  success: boolean;
  order: { number: number };
};

export type TApiData = {
  message: string;
  success: boolean;
};

export type TCookieProps = {
  expires?: number | string;
  path?: string;
} & { [extraParams: string]: string | number | boolean };
