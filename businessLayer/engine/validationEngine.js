const Joi = require("@hapi/joi");

class ValidationEngine {
  constructor() {
    this.questionSchema = Joi.object({
      id: Joi.number().integer().positive().required(), // Unique identifier for the question
      text: Joi.string().required(), // The question field is required
      options: Joi.array().items(Joi.string().required()).length(4).required(), // Options array with exactly 4 strings
      correct_option: Joi.number().integer().min(0).max(3).required(),
    });

    this.answerSchema = Joi.object({
      question_id: Joi.number().integer().positive().required(), // ID of the question being answered
      selected_option: Joi.number().integer().min(0).max(3).required(), // Index of the selected answer
      is_correct: Joi.boolean().required(), // Boolean indicating if the answer was correct
    });

    this.resultSchema = Joi.object({
      quiz_id: Joi.number().integer().positive().required(), // ID of the quiz
      user_id: Joi.number().integer().positive().required(), // ID of the user
      score: Joi.number().integer().min(0).required(), // The user’s score
      answers: Joi.array().items(this.answerSchema).required(), // List of answers provided by the user
    });

    this.quizSchema = Joi.object({
      id: Joi.number().integer().positive().required(), // Unique identifier for the quiz
      title: Joi.string().required(), // Title of the quiz
      questions: Joi.array().items(this.questionSchema).required(), // List of questions
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
      questions: Joi.array().items(this.questionSchema).required(), // The array of questions is required
    });
  }

  quizQuestionsSchema() {
    return Joi.object({
      id: Joi.number().integer().positive().required(), // Numeric id field that must be a positive integer
    });
  }
}

module.exports = ValidationEngine;
