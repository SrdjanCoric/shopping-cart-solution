import { createContext, useCallback, useState, FC } from "react";

const defaultStateValue = {
  cart: [],
};
const defaultDispatchValue = {
  checkout: () => undefined,
  addItemToCart: () => undefined,
  getCartItems: () => undefined,
};

export const CartStateContext = createContext(defaultStateValue);
export const CartDispatchContext = createContext(defaultDispatchValue);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(defaultStateValue.cart);

  const checkout = useCallback(() => {
    setCart(() => {
      return [];
    });
  }, [setCart]);

  const getCartItems = useCallback(
    (data) => {
      setCart(() => {
        return data;
      });
    },
    [setCart]
  );

  const addItemToCart = useCallback(
    (data) => {
      setCart((currentItems) => {
        const cartItem = currentItems.find((c) => c._id === data._id);
        if (cartItem) {
          return currentItems.map((c) => {
            if (c._id === data._id) {
              return { ...c, quantity: c.quantity + 1 };
            } else {
              return c;
            }
          });
        } else {
          return currentItems.concat(data);
        }
      });
    },
    [setCart]
  );

  return (
    <CartDispatchContext.Provider
      value={{
        checkout,
        addItemToCart,
        getCartItems,
      }}
    >
      <CartStateContext.Provider
        value={{
          cart,
        }}
      >
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
