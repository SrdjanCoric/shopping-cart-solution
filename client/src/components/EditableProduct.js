import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import EditProductForm from "./EditProductForm";

const EditableProduct = (props) => {
  const [editable, setEditable] = useState(false);
  const { product } = props;
  const [updating, setUpdating] = useState(false);
  const isZeroQuantity = product.quantity === 0;

  const dispatch = useDispatch();

  const deleteProduct = (id) => {
    axios
      .delete(`/api/products/${id}`)
      .then((response) => response.data)
      .then(dispatch({ type: "PRODUCT_DELETED", payload: id }));
  };

  const addToCart = (product, id, callback) => {
    setUpdating(true);
    axios
      .put(`/api/products/${id}`, product)
      .then((response) => response.data)
      .then((product) => {
        dispatch({ type: "ADDED_TO_CART", product });
        if (callback) {
          callback();
        }
      });
  };

  const updateProduct = (product, id, callback) => {
    axios
      .put(`/api/products/${id}`, product)
      .then((response) => response.data)
      .then((updatedProduct) => {
        dispatch({ type: "PRODUCT_UPDATED", payload: updatedProduct });
        if (callback) {
          callback();
        }
      });
  };

  const handleAddToCart = (product) => {
    if (product.quantity === 0 || updating) return;
    addToCart({ quantity: product.quantity - 1 }, product._id, () =>
      setUpdating(false)
    );
  };

  const handleToggleEdit = () => {
    setEditable(!editable);
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
          <EditProductForm
            product={product}
            onToggleEdit={handleToggleEdit}
            onUpdateProduct={updateProduct}
            editable={editable}
          />
        ) : (
          <div className="actions product-actions">
            <a
              className={
                isZeroQuantity
                  ? "button add-to-cart disabled"
                  : "button add-to-cart"
              }
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </a>
            <a className="button edit" onClick={handleToggleEdit}>
              Edit
            </a>
          </div>
        )}

        <a className="delete-button" onClick={() => deleteProduct(product._id)}>
          <span>X</span>
        </a>
      </div>
    </div>
  );
};

export default EditableProduct;
