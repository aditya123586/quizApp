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
      createdBy: quizData.userEmail,
      createdDate: new Date(),
    });

    return {
      id,
    };
  }

  async quizQuestions(quizId) {
    const quizQuestions = quizMaster.filter((quiz) => {
      return (quiz.id = quizId);
    });

    if (!quizQuestions.length) {
      throw new Error(responses.INVALID_QUIZ_ID);
    }

    return quizQuestions[0].questions.map(({ answer, ...rest }) => rest);
  }

  async quizAnswers() {}

  async quizResults() {}
}

module.exports = QuizAccessor;
