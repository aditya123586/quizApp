const StringMessageAccessor = require("./stringMessageAccessor");

const stringMessageAccessor = new StringMessageAccessor();

const responses = stringMessageAccessor.getMessages("en").API_RESPONSES;

const quizMaster = [];

class QuizAccessor {
  async createQuiz(quizData) {
    const id = Date.now().toString();

    quizMaster.push({
      id,
      title: quizData.title,
      questions: quizData.questions,
      createdBy: quizData.user_id,
      createdDate: new Date(),
    });

    return {
      id,
    };
  }

  async quizQuestions(quizId, questionId = 0) {
    const selectedQuizQuestion = 0;

    const quizQuestions = quizMaster.filter((quiz) => {
      return quiz.id === quizId;
    });

    if (!quizQuestions.length) {
      throw new Error(`${responses.INVALID_QUIZ_ID} ${quizId}`);
    }

    return quizQuestions[selectedQuizQuestion].questions.map(
      ({ answer, ...rest }) => rest
    );
  }

  async quizAnswer(quizQuestions, questionId, selectedOption) {
    const question = quizQuestions.filter((question) => {
      return question.id == questionId;
    });

    if (!question.length) {
      throw new Error(`${responses.INVALID_QUESTION_ID} ${questionId}`);
    }

    return {
      correctAnswer: question[0]["options"][question[0].correct_option],
      isCorrect: question[0].correct_option == selectedOption,
    };
  }

  async quizResults() {}
}

module.exports = QuizAccessor;
