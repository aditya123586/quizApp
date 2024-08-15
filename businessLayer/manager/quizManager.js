const QuizAccessor = require("../../dataAccess/quizAccessor");

const quizAccessor = new QuizAccessor();

class QuizManager {
  async createQuiz() {
    return quizAccessor.createQuiz();
  }

  async quizQuestions() {
    return quizAccessor.quizQuestions();
  }

  async quizAnswers() {
    return quizAccessor.quizAnswers();
  }

  async quizResults() {
    return quizAccessor.quizResults();
  }
}

module.exports = QuizManager;
