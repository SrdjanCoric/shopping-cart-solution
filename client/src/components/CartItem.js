import React from "react";

const CartItem = (props) => {
  return (
    <tr data-testid="cartItem">
      <td>{props.title}</td>
      <td>{props.quantity}</td>
      <td>${props.price}</td>
    </tr>
  );
};

export default CartItem;
