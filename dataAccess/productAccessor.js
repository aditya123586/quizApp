const ConnectDB = require("./../databaseConfiguration/connectDB");
const StringMessageAccessor = require("./../dataAccess/stringMessageAccessor");

const connectDB = new ConnectDB();
const stringMessageAccessor = new StringMessageAccessor();

const apiResponses = stringMessageAccessor.getMessages("en").API_RESPONSES;

class ProductAccessor {
  async getProductsList(filterData) {
    let whereClause = filterData.isUser ? `WHERE (pi.quantity) > 0` : "";

    if (filterData.productName) {
      whereClause +=
        (whereClause ? " AND " : "WHERE ") +
        `pm.product_name ILIKE '${filterData.productName}%'`;
    }

    return connectDB.getDBConnection().query(`SELECT
                                              pm.product_id,
                                              pm.sku_id,
                                              pm.price,
                                              pm.product_name,
                                              pm.product_description,
	                                            pm.created_date,
	                                            pm.updated_date,
                                              pi.inventory_id,
                                              pi.quantity
                                              FROM
                                              grocery.product_master pm
                                              LEFT JOIN
                                              grocery.product_inventory pi ON pm.product_id = pi.product_id
                                              ${whereClause}
                                              ORDER BY pm.created_date
                                              OFFSET ${filterData.offset}  
                                              LIMIT ${filterData.limit}`);
  }

  async addProduct(productInfo) {
    const { skuId, productName, productDescription, quantity, price } =
      productInfo;

    return connectDB.getDBConnection().tx(async (t) => {
      const skuExists = await this.checkProductSkuIdExists(skuId, t);

      if (!skuExists) {
        await t.none(
          "INSERT INTO grocery.product_master (sku_id, product_name, product_description,price) VALUES ($1, $2, $3, $4)",
          [skuId, productName, productDescription, price]
        );

        await t.none(
          "INSERT INTO grocery.product_inventory (product_id, quantity) " +
            "SELECT product_id, $2 FROM grocery.product_master WHERE sku_id = $1",
          [skuId, quantity]
        );
      } else {
        return Promise.reject(apiResponses.PRODUCT_EXISTS);
      }
    });
  }

  async editProduct(updatedProductInfo) {
    const { productId, productName, productDescription, quantity, price } =
      updatedProductInfo;

    return connectDB.getDBConnection().tx(async (t) => {
      await t.none(
        "UPDATE grocery.product_master SET product_name = $2, product_description = $3, price = $4 , updated_date = $5 WHERE product_id = $1",
        [productId, productName, productDescription, price, new Date()]
      );

      await t.none(
        "UPDATE grocery.product_inventory SET quantity = $2 WHERE product_id = $1",
        [productId, quantity]
      );
    });
  }

  async removeProduct(productInfo) {
    const { productIds } = productInfo;

    return connectDB.getDBConnection().tx(async (t) => {
      t.none(
        "DELETE FROM grocery.product_inventory WHERE product_id IN ($1:csv)",
        [productIds]
      );

      t.none(
        "DELETE FROM grocery.product_master WHERE product_id IN ($1:csv)",
        [productIds]
      );
    });
  }

  async updateProductInventory(productInfo, isOrderPlaced) {
    const { quantity, productId } = productInfo;

    const queryProductInventory = isOrderPlaced
      ? "UPDATE grocery.product_inventory SET quantity=quantity-$1 WHERE product_id=$2"
      : "UPDATE grocery.product_inventory SET quantity=$1 WHERE product_id=$2";

    return connectDB
      .getDBConnection()
      .none(queryProductInventory, [quantity, productId]);
  }

  async checkProductSkuIdExists(skuId, transaction) {
    return transaction.oneOrNone(
      "SELECT product_id FROM grocery.product_master WHERE sku_id = $1",
      [skuId]
    );
  }

  async getProductQuantity(productId, transaction) {
    return transaction.oneOrNone(
      "SELECT quantity FROM grocery.product_inventory WHERE product_id = $1",
      [productId]
    );
  }
}

module.exports = ProductAccessor;
