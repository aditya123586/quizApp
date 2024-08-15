const QuizAccessor = require("../../dataAccess/quizAccessor");

const quizAccessor = new QuizAccessor();

class QuizManager {
  async createQuiz(quizData) {
    return quizAccessor.createQuiz(quizData);
  }

  async quizQuestions(quizId) {
    return quizAccessor.quizQuestions(quizId);
  }

  async quizAnswers() {
    return quizAccessor.quizAnswers();
  }

  async quizResults() {
    return quizAccessor.quizResults();
  }
}

module.exports = QuizManager;
