const express = require("express");
const route = express.Router();

const StringMessageAccessor = require("./dataAccess/stringMessageAccessor");
const ProductService = require("./serviceLayer/productService");
const ErrorHandler = require("./middleware/errorHandler");
const OrderService = require("./serviceLayer/orderService");

const stringMessageAccessor = new StringMessageAccessor();
const productService = new ProductService();
const errorHandler = new ErrorHandler();
const orderService = new OrderService();

const apiResponses = stringMessageAccessor.getMessages("en").API_RESPONSES;
const apiAddress = stringMessageAccessor.getMessages("en").API_NAMES;

route.get(
  apiAddress.HOME.NAME,
  errorHandler.handlError(function (req, res, next) {
    req.tempStore.message = apiResponses.HOME_URL;
  })
);

route.post(
  apiAddress.GET_PRODUCT_LIST.NAME,
  errorHandler.handlError(productService.getProductsList)
);

route.post(
  apiAddress.ADD_PRODUCT.NAME,
  errorHandler.handlError(productService.addProduct)
);

route.post(
  apiAddress.EDIT_PRODUCT.NAME,
  errorHandler.handlError(productService.editProduct)
);

route.delete(
  apiAddress.REMOVE_PRODUCT.NAME,
  errorHandler.handlError(productService.removeProduct)
);

route.post(
  apiAddress.UPDATE_PRODUCT_INVENTORY.NAME,
  errorHandler.handlError(productService.updateProductInventory)
);

route.post(
  apiAddress.PLACE_ORDER.NAME,
  errorHandler.handlError(orderService.placeOrder)
);

module.exports = route;
