const QuizManager = require("../businessLayer/manager/quizManager");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const quizManager = new QuizManager();
const stringMessageAccessor = new StringMessageAccessor();

const responses = stringMessageAccessor.getMessages("en").API_RESPONSES;

class QuizService {
  async createQuiz(req) {
    req.tempStore.message = responses.CREATE_QUIZ;
    return quizManager.createQuiz();
  }

  async quizQuestions(req) {
    return quizManager.quizQuestions();
  }

  async quizAnswers(req) {
    return quizManager.quizAnswers();
  }

  async quizResults(req) {
    return quizManager.quizResults();
  }
}

module.exports = QuizService;
