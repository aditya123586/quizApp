const ProductAccessor = require("./../../dataAccess/productAccessor");
const ValidationEngine = require("./engine/validationEngine");

const productAccessor = new ProductAccessor();
const validationEngine = new ValidationEngine();

class ProductManager {
  async getProductsList(filterData) {
    return productAccessor.getProductsList(filterData);
  }

  async addProduct(productInfo) {
    return productAccessor.addProduct(productInfo);
  }

  async editProduct(updatedProductInfo) {
    return productAccessor.editProduct(updatedProductInfo);
  }

  async removeProduct(productInfo) {
    return productAccessor.removeProduct(productInfo);
  }

  async updateProductInventory(productInfo) {
    return productAccessor.updateProductInventory(productInfo);
  }
}

module.exports = ProductManager;
