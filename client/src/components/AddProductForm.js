import React, { useState, useContext } from "react";
import ProductForm from "./ProductForm";
import { ProductDispatchContext } from "../context/product-context";
import apiClient from "../lib/ApiClient";

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [visible, setVisible] = useState(false);

  const { addProduct } = useContext(ProductDispatchContext);

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

    apiClient.addProduct(product, (newProduct) => {
      addProduct(newProduct);
      handleToggleAddForm();
      resetState();
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

  const resetState = () => {
    setTitle("");
    setPrice(0);
    setQuantity(0);
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
