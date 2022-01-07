import axios from "axios";
import * as routes from "../constants/ApiRoutes";

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
      .get(routes.GET_CART_ITEMS)
      .then((response) => response.data)
      .then(callback)
      .catch((err) => console.log(err));
  },
  addToCart: function (productId, callback) {
    return axios
      .post(routes.ADD_TO_CART, { productId })
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
};

export default apiClient;
