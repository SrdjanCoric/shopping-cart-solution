import apiClient from "../lib/ApiClient";

export const cartItemsReceivedSuccess = (items) => {
  return { type: "CART_ITEMS_RECEIVED", payload: { items } };
};

export const addToCartSuccess = (item) => {
  return { type: "ADDED_TO_CART", payload: { item } };
};

export const checkoutSuccess = () => {
  return { type: "CHECKOUT" };
};

export function fetchCartItems(callback) {
  return function (dispatch) {
    apiClient.getCartItems((items) => {
      dispatch(cartItemsReceivedSuccess(items));
      if (callback) {
        callback();
      }
    });
  };
}

export function checkout(callback) {
  return function (dispatch) {
    apiClient.checkout((_) => {
      dispatch(checkoutSuccess());
      if (callback) {
        callback();
      }
    });
  };
}

// export function addToCartAction(product, productId, callback) {
//   return function (dispatch) {
//     apiClient.addToCart(productId, product.title, product.price, (item) => {
//       console.log("item", item.quantity);
//       dispatch(addToCartSuccess(item));
//       if (callback) {
//         callback();
//       }
//     });
//   };
// }
