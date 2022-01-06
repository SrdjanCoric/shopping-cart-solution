import React from "react";

const ProductForm = (props) => {
  return (
    <form>
      <div className="input-group">
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          name="title"
          value={props.title}
          onChange={props.onInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-price">Price</label>
        <input
          type="text"
          id="product-price"
          name="price"
          value={props.price}
          onChange={props.onInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-quantity">Quantity</label>
        <input
          type="text"
          id="product-quantity"
          value="2"
          name="quantity"
          value={props.quantity}
          onChange={props.onInputChange}
        />
      </div>

      <div className="actions form-actions">
        <a className="button" onClick={props.onSubmit}>
          {props.submitText}
        </a>
        {props.submitText !== "Add" ? (
          <a className="button" onClick={props.onCancelClick}>
            Cancel
          </a>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export default ProductForm;
