import { Location } from "history";

export type TLocataionState = {
  background: Location;
  from: Location;
};

export type TItemObject = {
  itemKey?: any;
  index?: any;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
};

export type TItemMobile = {
  image_mobile: string;
  name: string;
  price: number;
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
export type TUser = {
  name: string;
  email: string;
  password?: string | undefined;
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

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status?: string;
  updatedAt: string;
  _id: string;
};

export type TOrders = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};
