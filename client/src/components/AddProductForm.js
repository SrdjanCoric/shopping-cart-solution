import React, { useState } from "react";
import ProductForm from "./ProductForm";

const AddProductForm = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [visible, setVisible] = useState(false);

  const handleToggleAddForm = () => {
    setVisible(!visible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let product = {
      title,
      price,
      quantity,
    };

    props.onAddProduct(product);
    handleToggleAddForm();
    resetState();
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

  const resetState = () => {
    setTitle("");
    setPrice("");
    setQuantity("");
    setVisible(false);
  };

  const addFormClass = visible ? "add-form visible" : "add-form";

  return (
    <div className={addFormClass}>
      <p>
        <a className="button add-product-button" onClick={handleToggleAddForm}>
          Add A Product
        </a>
      </p>
      <h3>Add Product</h3>
      <ProductForm
        title={title}
        price={price}
        quantity={quantity}
        submitText="Add"
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default AddProductForm;
