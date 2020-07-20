const Question = require('../../../models/creating_area/chatbot/question.model');

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