import React from "react";
import CartItem from "./CartItem";

const ShoppingCart = (props) => {
  const cartItems = props.cart.map((item) => (
    <CartItem key={item._id} {...item} />
  ));

  const calculateTotal =
    Math.round(
      props.cart.reduce((acc, item) => acc + item.price * item.quantity, 0) *
        100
    ) / 100;
  return (
    <header>
      <h1>The Shop!</h1>
      {props.cart.length === 0 ? (
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
          <a className="button checkout" onClick={props.onCheckout}>
            Checkout
          </a>
        </div>
      )}
    </header>
  );
};

export default ShoppingCart;
