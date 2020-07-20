const db = require('../../database')

const Question = function createCardQuestion(question) {
    this.content = question.content;
    this.user_id = question.user_id;
    this.model_id = question.model_id;
}

Question.findQuestions = (userId, modelId, result) => {
  db.query(
    'SELECT * FROM question WHERE user_id = ? AND model_id = ?',
    [userId, modelId],
    (error, dbResult) => {
      if (error) {
        console.log(error)
        return result(error, null);
      }

      if (dbResult.length) {
        return result(null, dbResult);
      }

      return result({ kind: 'not_found' }, null);
    }
  );
};

module.exports = Question;