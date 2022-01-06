import React, { useState, useEffect } from "react";
import ShoppingCart from "./ShoppingCart";
import ProductListing from "./ProductListing";
import AddProductForm from "./AddProductForm";
import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => response.data)
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const indexOfProductInCart = (id) => {
    return cart.findIndex((product) => product._id === id);
  };

  const incrementCartItemQuantity = (productId) => {
    let updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return Object.assign({}, item, { quantity: item.quantity + 1 });
      } else {
        return item;
      }
    });
    setCart(updatedCart);
  };

  const decrementProductQuantity = (productId) => {
    let productToUpdate = products.find((product) => product._id === productId);
    return Object.assign({}, productToUpdate, {
      quantity: productToUpdate.quantity - 1,
    });
  };

  const handleCart = (product) => {
    let idxInCart = indexOfProductInCart(product._id);
    if (idxInCart === -1) {
      setCart(cart.concat(Object.assign({}, product, { quantity: 1 })));
    } else {
      incrementCartItemQuantity(product._id);
    }
  };

  const handleAddToCart = (productId) => {
    let product = products.find((product) => product._id === productId);
    if (product.quantity === 0) {
      return;
    }
    // let idxInCart = indexOfProductInCart(productId);

    // let updatedProduct = decrementProductQuantity(productId);
    // let quantity = { quantity: updatedProduct.quantity };

    handleUpdateProduct(
      { quantity: product.quantity - 1 },
      productId,
      handleCart
    );
  };

  const updateCartItem = (updatedProduct) => {
    const cartItemIdx = cart.findIndex(
      (item) => item._id === updatedProduct._id
    );
    if (cartItemIdx === -1) return;
    setCart(
      cart.map((item) => {
        if (item._id === updatedProduct._id) {
          return Object.assign({}, item, {
            title: updatedProduct.title,
            price: updatedProduct.price,
          });
        } else {
          return item;
        }
      })
    );
  };

  const handleCheckout = () => {
    setCart([]);
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`/api/products/${productId}`)
      .then((response) => response.data)
      .then(() => {
        setProducts(products.filter((p) => p._id !== productId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddProduct = (product) => {
    axios
      .post("/api/products", { ...product })
      .then((response) => response.data)
      .then((newProduct) => {
        setProducts(products.concat(newProduct));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProduct = (product, id, callback) => {
    axios
      .put(`/api/products/${id}`, { ...product })
      .then((response) => response.data)
      .then((newProduct) => {
        const newProducts = products.map((p) => {
          if (p._id === id) {
            return Object.assign({}, newProduct);
          } else {
            return p;
          }
        });
        setProducts(newProducts);
        if (callback) {
          callback(newProduct);
        } else {
          updateCartItem(newProduct);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="app">
      <ShoppingCart cart={cart} onCheckout={handleCheckout} />

      <main>
        <ProductListing
          products={products}
          onAddToCart={handleAddToCart}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />
        <AddProductForm onAddProduct={handleAddProduct} />
      </main>
    </div>
  );
};

export default Shop;
