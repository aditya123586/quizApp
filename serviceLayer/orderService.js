const OrderManager = require("../businessLayer/manager/orderManager");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const orderManager = new OrderManager();
const stringMessageAccessor = new StringMessageAccessor();

const apiResponses = stringMessageAccessor.getMessages("en").API_RESPONSES;

class OrderService {
  async placeOrder(req, res) {
    req.tempStore.message = apiResponses.ORDER_PLACED;
    req.tempStore.data = await orderManager.placeOrder(req.body);
  }
}

module.exports = OrderService;
