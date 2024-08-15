const StringMessageAccessor = require("./stringMessageAccessor");

const stringMessageAccessor = new StringMessageAccessor();

const responses = stringMessageAccessor.getMessages("en").API_RESPONSES;

const quizMaster = [];
const questionMaster = [];
const answerMaster = [];
const resultMaster = [];
class QuizAccessor {
  async createQuiz(quizData) {
    const id = Date.now().toString();

    quizMaster.push({
      id,
      title: quizData.title,
      createdBy: quizData.userId,
      createdDate: new Date(),
    });

    quizData.questions.forEach((question) => {
      questionMaster.push({
        quiz_id: id,
        id: question.questionId,
        text: question.text,
        options: question.options,
        correct_option: question.correctOption,
      });
    });

    return {
      quizId: id,
    };
  }

  async quizQuestions(quizId) {
    const quizRecords = quizMaster.filter((quiz) => {
      return quiz.id == quizId;
    });

    if (!quizRecords.length) {
      throw new Error(`${responses.INVALID_QUIZ_ID} ${quizId}`);
    }

    return questionMaster
      .filter((question) => {
        return question.quiz_id == quizId;
      })
      .map(({ ["correct_option"]: _, ...rest }) => rest);
  }

  async quizAnswer(userId, questionId, selectedOption, quizId) {
    const question = questionMaster.filter((question) => {
      return question.id == questionId;
    });

    if (!question.length) {
      throw new Error(`${responses.INVALID_QUESTION_ID} ${questionId}`);
    }

    const questionAnswered = answerMaster.filter((record) => {
      return (
        record.user_id == userId &&
        record.quiz_id == quizId &&
        record.question_id == questionId
      );
    });

    if (questionAnswered.length) {
      throw new Error(`${responses.ALREADY_ANSWERED} ${questionId}`);
    } else {
      const correctAnswer = question[0]["options"][question[0].correct_option];
      const isCorrect = question[0].correct_option == selectedOption;

      answerMaster.push({
        quiz_id: quizId,
        user_id: userId,
        question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect,
      });

      let score = 0;
      let answerByUser = [];

      answerMaster.forEach((record) => {
        if (record.user_id == userId && record.quiz_id == quizId) {
          if (record.is_correct) score += 1;

          const currentQuestion = questionMaster.filter(
            () => record.question_id
          )[0];

          answerByUser.push({
            question: currentQuestion.text,
            answerGiven: currentQuestion.options[record.selected_option],
            correctAnswer: currentQuestion.options[question[0].correct_option],
            isCorrect: record.is_correct,
          });
        }
      });

      resultMaster.push({
        quiz_id: quizId,
        user_id: userId,
        question_id: questionId,
        score,
        answerByUser,
      });

      return {
        correctAnswer,
        isCorrect,
      };
    }
  }

  async quizResults(userId, quizId, maxScore) {
    const quizRecords = resultMaster.filter((quiz) => {
      return quiz.user_id == userId && quiz.quiz_id == quizId;
    });

    if (!quizRecords.length) {
      throw new Error(`${responses.NO_RECORDS} [${userId},${quizId}]`);
    }

    return { ...quizRecords[0], maxScore };
  }
}

module.exports = QuizAccessor;
