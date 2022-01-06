import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { fetchCartItems, checkout } from "../actions/cartActions";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const cart = useSelector((state) => {
    return state.cart;
  });

  const checkoutCart = useCallback(() => {
    dispatch(checkout());
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
          <a className="button checkout" onClick={checkoutCart}>
            Checkout
          </a>
        </div>
      )}
    </header>
  );
};

export default ShoppingCart;
