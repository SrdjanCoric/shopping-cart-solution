import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";

const ShoppingCart = (props) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => {
    return state.cart;
  });

  const checkout = useCallback(() => {
    dispatch({ type: "CHECKOUT_CART" });
  }, [dispatch]);

  const cartItems = cart.map((item) => <CartItem key={item._id} {...item} />);

  const calculateTotal = (
    Math.round(
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100
    ) / 100
  ).toFixed(2);
  return (
    <header>
      <h1>The Shop!</h1>
      {cart.length === 0 ? (
        <div className="cart">
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
          <a className="button checkout disabled">Checkout</a>
        </div>
      ) : (
        <div className="cart">
          <h2>Your Cart</h2>
          <table className="cart-items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems}

              <tr>
                <td colSpan="3" className="total">
                  Total: ${calculateTotal}
                </td>
              </tr>
            </tbody>
          </table>
          <a className="button checkout" onClick={checkout}>
            Checkout
          </a>
        </div>
      )}
    </header>
  );
};

export default ShoppingCart;
