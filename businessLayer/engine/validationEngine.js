const Joi = require("@hapi/joi");

class ValidationEngine {
  // orderMasterSchema() {
  //   return Joi.object({
  //     orderDate: Joi.date()
  //       .iso()
  //       .default(() => new Date(), "current date"),
  //     totalAmount: Joi.number().positive().required(),
  //   });
  // }
}

module.exports = ValidationEngine;
