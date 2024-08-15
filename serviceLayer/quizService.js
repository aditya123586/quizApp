const QuizManager = require("../businessLayer/manager/quizManager");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const quizManager = new QuizManager();
const stringMessageAccessor = new StringMessageAccessor();

const responses = stringMessageAccessor.getMessages("en").API_RESPONSES;

class QuizService {
  async createQuiz(req) {
    req.tempStore.message = responses.CREATE_QUIZ;
    req.tempStore.data = await quizManager.createQuiz(req.body);
  }

  async quizQuestions(req) {
    req.tempStore.message = responses.QUIZ_FOUND;
    req.tempStore.data = await quizManager.quizQuestions(req.query.quizId);
  }

  async quizAnswer(req) {
    req.tempStore.message = responses.QUIZ_ANSWER;
    req.tempStore.data = await quizManager.quizAnswer(
      req.body.userId,
      req.body.quizId,
      req.body.questionId,
      req.body.selectedOption
    );
  }

  async quizResults(req) {
    return quizManager.quizResults(req.query.userId, req.query.quizId);
  }
}

module.exports = QuizService;
