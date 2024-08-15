const Joi = require("@hapi/joi");

class ValidationEngine {
  homeSchema() {
    return Joi.object({
      userEmail: Joi.string().email().required(), // The userEmail field is required and must be a valid email address
    });
  }

  createQuizSchema() {
    return Joi.object({
      userEmail: Joi.string().email().required(), // The userEmail field is required and must be a valid email address
      title: Joi.string().required(), // The title field is required and must be a string
      questions: Joi.array()
        .items(
          Joi.object({
            question: Joi.string().required(), // The question field is required
            options: Joi.array()
              .items(Joi.string().required())
              .length(4)
              .required(), // Options array with exactly 4 strings
            answer: Joi.number().integer().min(0).max(3).required(),
            //Use this incase of multiple choice question
            // answer: Joi.array()
            //   .items(Joi.number().integer().min(0).max(3).required()) // Index values from 0 to 3 (for 4 options)
            //   .min(1)
            //   .required(), // Answer must be an array of at least one index value
          })
        )
        .required(), // The array of questions is required
    });
  }

  quizQuestionsSchema() {
    return Joi.object({
      id: Joi.number().integer().positive().required(), // Numeric id field that must be a positive integer
    });
  }
}

module.exports = ValidationEngine;
