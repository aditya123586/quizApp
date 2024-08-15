const Joi = require("@hapi/joi");
const StringMessageAccessor = require("../../dataAccess/stringMessageAccessor");

const stringMessageAccessor = new StringMessageAccessor();

const errors = stringMessageAccessor.getMessages("en").ERRORS;

class ValidationEngine {
  constructor() {
    this.uniqueIds = (array, helper) => {
      const ids = array.map((item) => item.questionId);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      if (duplicates.length > 0) {
        return helper.message(`${errors.DUPLICATE_ID} ${duplicates[0]}`);
      }
      return array;
    };
  }

  homeSchema() {
    return Joi.object({
      userId: Joi.number().integer().positive().required(), // ID of the user
    });
  }

  createQuizSchema() {
    return Joi.object({
      userId: Joi.number().integer().positive().required(), // ID of the user
      title: Joi.string().required(), // The title field is required and must be a string
      questions: Joi.array()
        .items(
          Joi.object({
            questionId: Joi.number().integer().positive().required(), // Unique identifier for the question
            text: Joi.string().required(), // The question field is required
            options: Joi.array()
              .items(Joi.string().required())
              .length(4)
              .required(), // Options array with exactly 4 strings
            correctOption: Joi.number().integer().min(0).max(3).required(),
          })
        )
        .required()
        .custom(this.uniqueIds), // The array of questions is required
    });
  }

  quizQuestionsSchema() {
    return Joi.object({
      userId: Joi.number().integer().positive().required(), // ID of the user
      quizId: Joi.number().integer().positive().required(), // Numeric id field that must be a positive integer
    });
  }

  quizAnswerSchema() {
    return Joi.object({
      userId: Joi.number().integer().positive().required(), // ID of the user
      quizId: Joi.number().integer().positive().required(), // Numeric id field that must be a positive integer
      questionId: Joi.number().integer().positive().required(), // ID of the question being answered
      selectedOption: Joi.number().integer().min(0).max(3).required(), // Index of the selected answer
    });
  }

  quizResultsSchema() {
    return Joi.object({
      userId: Joi.number().integer().positive().required(), // ID of the user
      quizId: Joi.number().integer().positive().required(), // Numeric id field that must be a positive integer
    });
  }
}

module.exports = ValidationEngine;
