import React from "react";
import ShoppingCart from "./ShoppingCart";
import ProductListing from "./ProductListing";
import AddProductForm from "./AddProductForm";

const App = () => {
  return (
    <div id="app">
      <ShoppingCart />

      <main>
        <ProductListing />
        <AddProductForm />
      </main>
    </div>
  );
};

export default App;
