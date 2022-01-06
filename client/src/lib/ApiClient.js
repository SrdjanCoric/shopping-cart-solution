import axios from "axios";
import * as routes from "../constants/ApiRoutes";

// axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getProducts: function (callback) {
    return axios
      .get(routes.GET_PRODUCTS_URL)
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },
  addProduct: function (product, callback) {
    return axios
      .post(routes.ADD_PRODUCT_URL, { ...product })
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },
  deleteProduct: function (id, callback) {
    return axios
      .delete(routes.deleteProduct(id))
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },

  updateProduct: function (id, product, callback) {
    return axios
      .put(routes.updateProduct(id), { ...product })
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },
  getCartItems: function (callback) {
    return axios
      .get(routes.GET_CART_URL)
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },
  checkout: function (callback) {
    return axios
      .post(routes.CHECKOUT)
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },
  addToCart: function (productId, title, price, callback) {
    return axios
      .post(routes.ADD_CART_ITEM, { productId, title, price })
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },
  addProductToCart: function (id, callback) {
    return axios
      .post("/api/add-to-cart", { productId: id })
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },
};

export default apiClient;
