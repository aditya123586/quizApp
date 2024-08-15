const QuizAccessor = require("../../dataAccess/quizAccessor");

const quizAccessor = new QuizAccessor();

class QuizManager {
  async createQuiz(quizData) {
    return quizAccessor.createQuiz(quizData);
  }

  async quizQuestions(quizId) {
    return quizAccessor.quizQuestions(quizId);
  }

  async quizAnswer(quizId, questionId, selectedOption) {
    const quizQuestions = await quizAccessor.quizQuestions(quizId);
    return quizAccessor.quizAnswer(quizQuestions, questionId, selectedOption);
  }

  async quizResults() {
    return quizAccessor.quizResults();
  }
}

module.exports = QuizManager;
