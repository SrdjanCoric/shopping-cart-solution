import React from "react";

const CartItem = (props) => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.quantity}</td>
      <td>${props.price}</td>
    </tr>
  );
};

export default CartItem;
