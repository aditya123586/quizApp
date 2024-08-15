const QuizAccessor = require("../../dataAccess/quizAccessor");

const quizAccessor = new QuizAccessor();

class QuizManager {
  async createQuiz(quizData) {
    return quizAccessor.createQuiz(quizData);
  }

  async quizQuestions(quizId) {
    return quizAccessor.quizQuestions(quizId);
  }

  async quizAnswer(userId, quizId, questionId, selectedOption) {
    await quizAccessor.quizQuestions(quizId);
    return quizAccessor.quizAnswer(userId, questionId, selectedOption, quizId);
  }

  async quizResults(userId, quizId) {
    const quizQuestions = await quizAccessor.quizQuestions(quizId);
    return quizAccessor.quizResults(userId, quizId, quizQuestions.length);
  }
}

module.exports = QuizManager;
