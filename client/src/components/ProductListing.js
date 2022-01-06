import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditableProduct from "./EditableProduct";

const ProductListing = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => response.data)
      .then((products) => {
        dispatch({ type: "PRODUCTS_RECEIVED", payload: products });
      });
  }, [dispatch]);

  const editableProducts = products.map((product) => (
    <EditableProduct key={product._id} product={product} />
  ));
  return (
    <div className="product-listing">
      <h2>Products</h2>
      {editableProducts}
    </div>
  );
};

export default ProductListing;
