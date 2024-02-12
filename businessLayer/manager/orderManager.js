const OrderAccessor = require("../../dataAccess/orderAccessor");

const orderAccessor = new OrderAccessor();

class OrderManager {
  async placeOrder(productInfo) {
    return orderAccessor.placeOrder(productInfo);
  }
}

module.exports = OrderManager;
