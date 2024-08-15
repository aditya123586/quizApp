const StringMessageAccessor = require("./stringMessageAccessor");

const stringMessageAccessor = new StringMessageAccessor();

const responses = stringMessageAccessor.getMessages("en").API_RESPONSES;

const quizMaster = [];
const quizResultMaster = {};

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

  async quizAnswer(userId, quizQuestions, questionId, selectedOption, quizId) {
    console.log(JSON.stringify(quizResultMaster, null, 4));
    const question = quizQuestions.filter((question) => {
      return question.questionId == questionId;
    });

    if (!question.length) {
      throw new Error(`${responses.INVALID_QUESTION_ID} ${questionId}`);
    }

    if (!quizResultMaster[userId]) {
      quizResultMaster[userId] = {}; // Initialize an object for the user if it doesn't exist
    }

    if (!quizResultMaster[userId][quizId]) {
      quizResultMaster[userId][quizId] = {}; // Initialize an object for the quiz if it doesn't exist
    }

    if (!quizResultMaster[userId][quizId][questionId]) {
      const isCorrect = question[0].correct_option == selectedOption;

      quizResultMaster[userId][quizId][questionId] = {
        selectedOption: question[0]["options"][selectedOption],
        isCorrect,
      }; // Initialize an object for the question if it doesn't exist

      return {
        correctAnswer: question[0]["options"][question[0].correct_option],
        isCorrect,
      };
    } else {
      throw new Error(`${responses.ALREADY_ANSWERED} ${questionId}`);
    }
  }

  async quizResults() {}
}

module.exports = QuizAccessor;
