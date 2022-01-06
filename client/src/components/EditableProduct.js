import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateProductAction,
  deleteProductAction,
  addProductToCartAction,
} from "../actions/productActions";
import { addToCartAction } from "../actions/cartActions";
import EditProductForm from "./EditProductForm";

const EditableProduct = (props) => {
  const [editable, setEditable] = useState(false);
  const { product } = props;
  const isZeroQuantity = product.quantity === 0;

  const dispatch = useDispatch();

  const deleteProduct = (id) => {
    dispatch(deleteProductAction(id));
  };

  const updateProduct = (product, id, callback) => {
    dispatch(updateProductAction(product, id, callback));
  };

  const handleAddToCart = (product) => {
    if (product.quantity === 0) return;
    dispatch(addProductToCartAction(product._id));
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
