const Joi = require("@hapi/joi");
const StringMessageAccessor = require("../../dataAccess/stringMessageAccessor");

const stringMessageAccessor = new StringMessageAccessor();

const errors = stringMessageAccessor.getMessages("en").ERRORS;

class ValidationEngine {
  constructor() {
    this.uniqueIds = (array, helper) => {
      const ids = array.map((item) => item.id);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      if (duplicates.length > 0) {
        return helper.message(`${errors.DUPLICATE_ID} ${duplicates[0]}`);
      }
      return array;
    };

    this.quizSchema = Joi.object({
      id: Joi.number().integer().positive().required(), // Unique identifier for the quiz
      title: Joi.string().required(), // Title of the quiz
      questions: Joi.array()
        .items(
          Joi.object({
            id: Joi.number().integer().positive().required(), // Unique identifier for the question
            text: Joi.string().required(), // The question field is required
            options: Joi.array()
              .items(Joi.string().required())
              .length(4)
              .required(), // Options array with exactly 4 strings
            correct_option: Joi.number().integer().min(0).max(3).required(),
          })
        )
        .required()
        .custom(this.uniqueIds), // List of questions
    });
  }

  homeSchema() {
    return Joi.object({
      user_id: Joi.number().integer().positive().required(), // ID of the user
    });
  }

  createQuizSchema() {
    return Joi.object({
      user_id: Joi.number().integer().positive().required(), // ID of the user
      title: Joi.string().required(), // The title field is required and must be a string
      questions: Joi.array()
        .items(
          Joi.object({
            id: Joi.number().integer().positive().required(), // Unique identifier for the question
            text: Joi.string().required(), // The question field is required
            options: Joi.array()
              .items(Joi.string().required())
              .length(4)
              .required(), // Options array with exactly 4 strings
            correct_option: Joi.number().integer().min(0).max(3).required(),
          })
        )
        .required()
        .custom(this.uniqueIds), // The array of questions is required
    });
  }

  quizQuestionsSchema() {
    return Joi.object({
      user_id: Joi.number().integer().positive().required(), // ID of the user
      id: Joi.number().integer().positive().required(), // Numeric id field that must be a positive integer
    });
  }

  quizAnswerSchema() {
    return Joi.object({
      user_id: Joi.number().integer().positive().required(), // ID of the user
      quiz_id: Joi.number().integer().positive().required(), // Numeric id field that must be a positive integer
      question_id: Joi.number().integer().positive().required(), // ID of the question being answered
      selected_option: Joi.number().integer().min(0).max(3).required(), // Index of the selected answer
    });
  }
}

module.exports = ValidationEngine;
