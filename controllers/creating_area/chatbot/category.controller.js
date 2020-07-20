const Category = require('../../../models/creating_area/chatbot/category.model')

exports.findCategory = (request, response) => {
    Category.findCategory(request.params.userId, request.params.modelId, (error, dbResult) => {
      if (error !== null) {
        if (error.kind === 'not_found') {
          return response.status(404).send({
            message: `Not found category with id ${request.params.userId}.`
          });
        }
        return response.status(500).send({
          message: `Error retrieving category with id ${request.params.userId}`
        });
      }

      // Envoi de la réponse
      return response.status(200).send(dbResult);
    });
  };