import React, { useContext, useEffect } from "react";
import {
  ProductDispatchContext,
  ProductStateContext,
} from "../context/product-context";
import apiClient from "../lib/ApiClient";
import EditableProduct from "./EditableProduct";

const ProductListing = () => {
  const { products } = useContext(ProductStateContext);
  const { getProducts } = useContext(ProductDispatchContext);
  const productComponents = products.map((product) => (
    <EditableProduct key={product._id} product={product} />
  ));

  useEffect(() => {
    apiClient.getProducts((products) => {
      getProducts(products);
    });
  }, [getProducts]);
  return (
    <div className="product-listing">
      <h2>Products</h2>
      {productComponents}
    </div>
  );
};

export default ProductListing;
