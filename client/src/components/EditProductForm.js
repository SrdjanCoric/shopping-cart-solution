import React, { useState, useContext } from "react";
import ProductForm from "./ProductForm";
import { ProductDispatchContext } from "../context/product-context";
import apiClient from "../lib/ApiClient";

const EditProductForm = ({ product, onToggleEdit }) => {
  const [title, setTitle] = useState(product.title || "");
  const [price, setPrice] = useState(product.price || 0);
  const [quantity, setQuantity] = useState(product.quantity || 0);

  const { updateProduct } = useContext(ProductDispatchContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let editedProduct = {
      title,
      price,
      quantity,
    };
    apiClient.updateProduct(product._id, editedProduct, (updatedProduct) => {
      updateProduct(updatedProduct);
      onToggleEdit();
    });
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "price":
        setPrice(+value);
        break;
      case "quantity":
        setQuantity(+value);
        break;
    }
  };

  const handleCancelClick = () => {
    setTitle(product.title);
    setPrice(product.price);
    setQuantity(product.quantity);
    onToggleEdit();
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <ProductForm
        title={title}
        price={price}
        quantity={quantity}
        onInputChange={handleInputChange}
        setQuantity={setQuantity}
        onSubmit={handleSubmit}
        submitText="Update"
        onCancelClick={handleCancelClick}
      />
    </div>
  );
};

export default EditProductForm;
