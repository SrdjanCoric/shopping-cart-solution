import { useContext, useEffect } from "react";
import { CartDispatchContext, CartStateContext } from "../context/cart-context";
import apiClient from "../lib/ApiClient";
import CartItem from "./CartItem";

const ShoppingCart = (props) => {
  const { cart } = useContext(CartStateContext);
  const { checkout, getCartItems } = useContext(CartDispatchContext);
  const cartItems = cart.map((item) => <CartItem key={item._id} {...item} />);

  const handleCheckout = () => {
    apiClient.checkout(() => {
      checkout();
    });
  };

  useEffect(() => {
    apiClient.getCartItems((cartItems) => {
      getCartItems(cartItems);
    });
  }, [getCartItems]);

  const calculateTotal =
    Math.round(
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100
    ) / 100;

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
          <table className="cart-items" data-testid="table">
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
                <td colSpan={3} className="total">
                  Total: ${calculateTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <a className="button checkout" onClick={handleCheckout}>
            Checkout
          </a>
        </div>
      )}
    </header>
  );
};

export default ShoppingCart;
