export const products = (state = [], action) => {
  switch (action.type) {
    case "PRODUCTS_RECEIVED":
      return action.payload;
    case "PRODUCT_DELETED":
      return state.filter((product) => product._id !== action.payload);
    case "PRODUCT_ADDED":
      return state.concat(action.payload);
    case "PRODUCT_UPDATED":
      return state.map((product) => {
        if (product._id === action.payload._id) {
          return Object.assign({}, action.payload);
        } else {
          return product;
        }
      });
    case "ADDED_TO_CART":
      return state.map((product) => {
        if (product._id === action.payload.product._id) {
          return Object.assign({}, product, {
            quantity: action.payload.product.quantity,
          });
        } else {
          return product;
        }
      });
    default:
      return state;
  }
};
