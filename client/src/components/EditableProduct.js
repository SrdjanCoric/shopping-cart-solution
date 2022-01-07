import React, { useState, useContext } from "react";
import EditProductForm from "./EditProductForm";
import { CartDispatchContext } from "../context/cart-context";
import { ProductDispatchContext } from "../context/product-context";
import apiClient from "../lib/ApiClient";

const EditableProduct = (props) => {
  const [editable, setEditable] = useState(false);
  const { product } = props;
  const { addProductToCart, deleteProduct } = useContext(
    ProductDispatchContext
  );
  const { addItemToCart } = useContext(CartDispatchContext);
  const isZeroQuantity = product.quantity === 0;

  const handleToggleEdit = () => {
    setEditable(!editable);
  };

  const handleAddToCart = () => {
    if (product.quantity === 0) {
      return;
    }
    console.log("here");
    apiClient.addToCart(product._id, (data) => {
      console.log(data, "data");
      addProductToCart(data.product);
      addItemToCart(data.item);
    });
  };

  const handleDeleteProduct = () => {
    apiClient.deleteProduct(product._id, () => {
      deleteProduct(product._id);
    });
  };
  return (
    <div className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className={isZeroQuantity ? "quantity none-left" : "quantity"}>
          {product.quantity} left in stock
        </p>
        {editable ? (
          <EditProductForm product={product} onToggleEdit={handleToggleEdit} />
        ) : (
          <div className="actions product-actions">
            <a
              className={
                isZeroQuantity
                  ? "button add-to-cart disabled"
                  : "button add-to-cart"
              }
              onClick={handleAddToCart}
            >
              Add to Cart
            </a>
            <a className="button edit" onClick={handleToggleEdit}>
              Edit
            </a>
          </div>
        )}

        <a className="delete-button" onClick={handleDeleteProduct}>
          <span>X</span>
        </a>
      </div>
    </div>
  );
};

export default EditableProduct;
