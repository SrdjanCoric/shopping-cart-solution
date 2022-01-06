import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditableProduct from "./EditableProduct";
import { fetchProductsAction } from "../actions/productActions";

const ProductListing = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAction());
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
