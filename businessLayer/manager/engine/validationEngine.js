const Joi = require("@hapi/joi");

class ValidationEngine {
  orderMasterSchema() {
    return Joi.object({
      orderDate: Joi.date()
        .iso()
        .default(() => new Date(), "current date"),
      totalAmount: Joi.number().positive().required(),
    });
  }

  orderDetailsSchema() {
    return Joi.object({
      orderId: Joi.number().integer().positive().required(),
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
      pricePerUnit: Joi.number().positive().required(),
      totalAmount: Joi.number().positive().required(),
    });
  }

  productMasterSchema() {
    return Joi.object({
      skuId: Joi.string().max(50).required(),
      productName: Joi.string().max(255).required(),
      productDescription: Joi.string(),
      createdDate: Joi.date()
        .iso()
        .default(() => new Date(), "current date"),
      updatedDate: Joi.date()
        .iso()
        .default(() => new Date(), "current date"),
    });
  }

  productInventorySchema() {
    return Joi.object({
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
    });
  }

  rolesSchema() {
    return Joi.object({
      roleName: Joi.string().max(255).required(),
    });
  }

  userMasterSchema() {
    return Joi.object({
      userName: Joi.string().max(255).required(),
      password: Joi.string().max(255).required(),
      roleId: Joi.number().integer().positive().required(),
    });
  }
}

module.exports = ValidationEngine;
