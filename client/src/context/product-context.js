import { createContext, useCallback, useState, FC } from "react";

const defaultStateValue = {
  products: [],
};
const defaultDispatchValue = {
  getProducts: () => undefined,
  addProduct: () => undefined,
  deleteProduct: () => undefined,
  updateProduct: () => undefined,
  addProductToCart: () => undefined,
};

export const ProductStateContext = createContext(defaultStateValue);
export const ProductDispatchContext = createContext(defaultDispatchValue);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(defaultStateValue.products);

  const getProducts = useCallback(
    (data) => {
      setProducts(() => {
        return data;
      });
    },
    [setProducts]
  );

  const addProduct = useCallback(
    (data) => {
      setProducts((currentProducts) => {
        return [...currentProducts, data];
      });
    },
    [setProducts]
  );

  const deleteProduct = useCallback(
    (data) => {
      setProducts((currentProducts) => {
        return currentProducts.filter((p) => p._id !== data);
      });
    },
    [setProducts]
  );

  const updateProduct = useCallback(
    (data) => {
      setProducts((currentProducts) => {
        return currentProducts.map((p) => {
          if (p._id === data._id) {
            return { ...data };
          } else {
            return p;
          }
        });
      });
    },
    [setProducts]
  );

  const addProductToCart = useCallback(
    (data) => {
      setProducts((currentProducts) => {
        return currentProducts.map((p) => {
          if (p._id === data._id) {
            if (p.quantity === 0) {
              return p;
            }
            return { ...p, quantity: p.quantity - 1 };
          } else {
            return p;
          }
        });
      });
    },
    [setProducts]
  );

  return (
    <ProductDispatchContext.Provider
      value={{
        getProducts,
        addProduct,
        deleteProduct,
        updateProduct,
        addProductToCart,
      }}
    >
      <ProductStateContext.Provider
        value={{
          products,
        }}
      >
        {children}
      </ProductStateContext.Provider>
    </ProductDispatchContext.Provider>
  );
};
