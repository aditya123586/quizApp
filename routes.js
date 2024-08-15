const express = require("express");
const route = express.Router();

const StringMessageAccessor = require("./dataAccess/stringMessageAccessor");
const ErrorHandler = require("./middleware/errorHandler");
const QuizService = require("./serviceLayer/quizService");
const ValidationEngine = require("./businessLayer/engine/validationEngine");

const stringMessageAccessor = new StringMessageAccessor();
const errorHandler = new ErrorHandler();
const quizService = new QuizService();
const validationEngine = new ValidationEngine();

const apiAddress = stringMessageAccessor.getMessages("en").API_NAMES;

route.get(
  apiAddress.HOME.NAME,
  errorHandler.handlError(
    function (req, res, next) {},
    apiAddress.HOME.ACCESS,
    validationEngine.homeSchema()
  )
);

route.post(
  apiAddress.CREATE_QUIZ.NAME,
  errorHandler.handlError(
    quizService.createQuiz,
    apiAddress.CREATE_QUIZ.ACCESS,
    validationEngine.createQuizSchema()
  )
);

route.get(
  apiAddress.QUIZ_QUESTIONS.NAME,
  errorHandler.handlError(
    quizService.quizQuestions,
    apiAddress.QUIZ_QUESTIONS.ACCESS,
    validationEngine.quizQuestionsSchema()
  )
);

module.exports = route;
