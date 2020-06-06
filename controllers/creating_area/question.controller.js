const Question = require('../../models/creating_area/question.model');
const checkToken = require('../../middlewares/webToken/checkToken')

exports.createQuestion = function createAQuestion(request, response) {

    if (!request.body) {
        return response.status(400).send({
          message: 'Content can not be empty!'
        });
      }

    const question = new Question({
        content: request.body.content,
        user_id: request.body.user_id,
        model_id: request.body.model_id
    })

    return Question.createQuestion(question, (error, data) => {
        if(error){
            return response.status(500).send({
                message:
                error.message || 'Some error occurred while creating the question.'
        })
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }

    return response.status(200).send(data);
})
}

exports.findQuestions = (request, response) => {
  Question.findQuestions(request.params.userId, request.params.modelId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found questions with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving questions with id ${request.params.userId}`
      });
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.deleteQuestion = (request, response) => {
  const { questionId, userId, modelId } = request.params;
  Question.deleteQuestion(questionId, userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }

    return response.status(200).send(result);
  });
};

exports.updateQuestion = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const {questionId, userId, modelId} = request.params

  return Question.updateQuestion(questionId, userId, modelId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de question numéro ${questionId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer une question n° ${questionId}`
      });
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }
      
    return response.status(200).send(data);
  });
};