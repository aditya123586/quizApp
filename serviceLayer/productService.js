const ProductManager = require("../businessLayer/manager/productManager");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const productManager = new ProductManager();
const stringMessageAccessor = new StringMessageAccessor();

const apiResponses = stringMessageAccessor.getMessages("en").API_RESPONSES;

class ProductService {
  async getProductsList(req, res) {
    req.tempStore.message = apiResponses.PRODUCT_LIST;
    req.tempStore.data = await productManager.getProductsList(req.body);
  }

  async addProduct(req, res) {
    req.tempStore.message = apiResponses.ADD_PRODUCT;
    req.tempStore.data = await productManager.addProduct(req.body);
  }

  async editProduct(req, res) {
    req.tempStore.message = apiResponses.EDIT_PRODUCT;
    req.tempStore.data = await productManager.editProduct(req.body);
  }

  async removeProduct(req, res) {
    req.tempStore.message = apiResponses.REMOVE_PRODUCT;
    req.tempStore.data = await productManager.removeProduct(req.body);
  }

  async updateProductInventory(req, res) {
    req.tempStore.message = apiResponses.UPDATE_PRODUCT_INVENTORY;
    req.tempStore.data = await productManager.updateProductInventory(req.body);
  }
}

module.exports = ProductService;
