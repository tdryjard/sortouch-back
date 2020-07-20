const Container = require('../../../models/creating_area/chatbot/container.model');

exports.findContainers = (request, response) => {
  return Container.findContainers(request.params.userId, request.params.responseId, request.params.modelId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found containers with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving containers with id ${request.params.userId}`
      });
    }
    return response.status(200).send(dbResult);
  });
};

exports.findChatBot = (request, response) => {
  const { query } = request
  if (query.userId && query.modelId) {
    return Container.findChatbot(query.modelId, query.userId, query.responseId, (error, dbResult) => {
      if (error) {
        if (error.kind === 'not_found') {
          response.status(404).send({
            message: `Not found order with id ${query.userId}.`
          });
        } else {
          response.status(500).send({
            message: `Error retrieving order with id ${query.userId}`
          });
        }
      } else {
        response.send(dbResult);
      }
    })
  }
}