export const cart = (state = [], action) => {
  switch (action.type) {
    case "ADDED_TO_CART":
      const isInCart = state.find((it) => it._id === action.payload.item._id);

      if (isInCart) {
        return state.map((it) => {
          if (it._id === action.payload.item._id) {
            return action.payload.item;
          } else {
            return it;
          }
        });
      } else {
        return state.concat(action.payload.item);
      }
    // const someInCart = state.some((prod) => prod._id === action.product._id);
    // let updatedCart;

    // while (action.product.quantity > 0) {
    //   if (someInCart) {
    //     updatedCart = state.map((product) => {
    //       if (product._id === action.product._id) {
    //         return Object.assign({}, product, {
    //           quantity: product.quantity + 1,
    //         });
    //       } else {
    //         return product;
    //       }
    //     });
    //   } else {
    //     updatedCart = state.concat(
    //       Object.assign({}, action.product, { quantity: 1 })
    //     );
    //   }
    //   return updatedCart;
    // }
    // return state;
    case "PRODUCT_DELETED":
      return state.filter((prod) => prod._id !== action.payload);
    case "PRODUCT_UPDATED":
      return state.map((prod) => {
        if (prod._id === action.payload._id) {
          let updatedProduct = {
            title: action.payload.title || prod.title,
            price:
              action.payload.price === undefined
                ? prod.price
                : action.payload.price,
          };
          return Object.assign({}, prod, updatedProduct);
        } else {
          return prod;
        }
      });
    case "CHECKOUT":
      return [];
    case "CART_ITEMS_RECEIVED": {
      return action.payload.items;
    }
    default:
      return state;
  }
};
