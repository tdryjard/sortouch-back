const Relation = require('../../../models/creating_area/chatbot/relation_container.model');

exports.findRelation = (request, response) => {
  Relation.findRelation(request.params.userId, request.params.modelId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found relation with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving relation with id ${request.params.userId}`
      });
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.findRelationCardQuestion = (request, response) => {
  Relation.findRelationCardQuestion(request.params.containerId, request.params.userId, request.params.modelId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found relation with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving relation with id ${request.params.userId}`
      });
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.findRelationCardResponse = (request, response) => {
  Relation.findRelationCardResponse(request.params.containerId, request.params.userId, request.params.modelId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found relation with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving relation with id ${request.params.userId}`
      });
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.findRelationCardCategory = (request, response) => {
  Relation.findRelationCardCategory(request.params.containerId, request.params.userId, request.params.modelId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found relation with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving relation with id ${request.params.userId}`
      });
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};