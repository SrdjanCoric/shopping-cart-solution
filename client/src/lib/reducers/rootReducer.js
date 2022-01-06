import { combineReducers } from "redux";
import { products } from "./products";
import { cart } from "./cart";

export const rootReducer = combineReducers({
  products,
  cart,
});
