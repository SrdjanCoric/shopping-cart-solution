import React, { useState } from "react";
import ProductForm from "./ProductForm";

const EditProductForm = (props) => {
  const [title, setTitle] = useState(props.product.title || "");
  const [price, setPrice] = useState(props.product.price || 0);
  const [quantity, setQuantity] = useState(props.product.quantity || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    let editedProduct = {
      title,
      price,
      quantity,
    };
    props.onUpdateProduct(editedProduct, props.product._id, props.onToggleEdit);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
    }
  };

  const handleCancelClick = () => {
    setTitle(props.product.title);
    setPrice(props.product.price);
    setQuantity(props.product.quantity);
    props.onToggleEdit();
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <ProductForm
        title={title}
        price={price}
        quantity={quantity}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        submitText="Update"
        onCancelClick={handleCancelClick}
      />
    </div>
  );
};

export default EditProductForm;
