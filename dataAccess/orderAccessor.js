const ConnectDB = require("../databaseConfiguration/connectDB");
const ProductAccessor = require("./productAccessor");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const connectDB = new ConnectDB();
const productAccessor = new ProductAccessor();
const stringMessageAccessor = new StringMessageAccessor();

const apiResponses = stringMessageAccessor.getMessages("en").API_RESPONSES;

class OrderAccessor {
  async placeOrder(orderData) {
    const { productDetails, totalAmount } = orderData;

    return connectDB.getDBConnection().tx(async (t) => {
      const orderInfo = await t.one(
        `INSERT INTO "order".ordermaster(total_amount) VALUES($1) RETURNING order_id`,
        [totalAmount]
      );

      for (const prouductInfo of productDetails) {
        const { productId, quantity, pricePerUnit, totalAmount } = prouductInfo;

        const productExistWithQuantity =
          await productAccessor.getProductQuantity(productId, t);

        if (
          productExistWithQuantity &&
          productExistWithQuantity.quantity >= quantity
        ) {
          await t.none(
            `INSERT INTO "order".orderdetails(order_id,product_id,quantity,price_per_unit,total_amount) VALUES($1, $2, $3, $4, $5)`,
            [orderInfo.order_id, productId, quantity, pricePerUnit, totalAmount]
          );

          await productAccessor.updateProductInventory(
            { quantity, productId },
            orderData
          );
        } else {
          return Promise.reject(apiResponses.PRODUCT_OUT_OF_STOCK + productId);
        }
      }
    });
  }
}

module.exports = OrderAccessor;
