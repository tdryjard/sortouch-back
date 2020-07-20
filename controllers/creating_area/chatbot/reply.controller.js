const Reply = require('../../../models/creating_area/chatbot/reply.model');

exports.findReply = (request, response) => {
  Reply.findReply(request.params.userId, request.params.modelId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found reply with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving reply with id ${request.params.userId}`
      });
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};