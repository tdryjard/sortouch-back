const db = require('../database')

const Question = function createCardQuestion(question) {
    this.content = question.content;
    this.user_id = question.user_id;
    this.model_id = question.model_id;
}

Question.createQuestion = (newQuestion, result) => {
    db.query('INSERT INTO question SET ?', [newQuestion], (error, dbResult) => {
        if (error){
          console.log(error)
            return result(error, null)
        }
        questionId = dbResult.insertId
        return result(null, {id: dbResult.insertId, ...newQuestion})
    })
};

Question.deleteQuestion = (questionId, userId, modelId, result) => {
  db.query('DELETE FROM question WHERE id = ? AND user_id = ? AND model_id = ?', [questionId, userId, modelId], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `Destination #${questionId} supprimée`,
      status: 200
    });
  });
};

Question.deleteByModel = (userId, modelId, result) => {
  db.query('DELETE FROM question WHERE user_id = ? AND model_id = ?', [userId, modelId], err => {
    if (err) return result({ message: err.message, status: 500 }, null);
    
    return result(null, {
      message: `Questions supprimée`,
      status: 200
    });
  });
};


Question.updateQuestion = (questionId, userId, modelId, question, result) => {
  db.query('UPDATE question SET ? WHERE id = ? AND user_id = ? AND model_id = ?', [question, questionId, userId, modelId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      return result({ kind: 'not_found' }, null);
    }

    return result(null, { questionId: Number(questionId), ...question });
  });
};

module.exports = Question;