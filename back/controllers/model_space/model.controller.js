const Model = require('../../models/model_space/model.model')
const checkToken = require('../../middlewares/webToken/checkToken')

exports.createModel = function createAModel(request, response) {

    if (!request.body) {
        return response.status(400).send({
          message: 'Content can not be empty!'
        });
      }

    const model = new Model({
        name: request.body.name,
        user_id: request.body.user_id
    })

    return Model.createModel(model, (error, data) => {
        if(error){
            return response.status(500).send({
                message:
                error.message || 'Some error occurred while creating the category.'
        })
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }
    
    return response.status(201).send(data);
})
}

exports.findModel = (request, response) => {
    Model.findModel(request.params.userId, (error, dbResult) => {
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

      const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }
      // Envoi de la réponse
      return response.status(200).send(dbResult);
    });
  };

exports.deleteModel = (request, response) => {
  const { modelId, userId } = request.params;
  Model.deleteModel(modelId, userId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }
    return response.status(200).send(result);
  });
};

exports.updateModel = (request, response) => {
  if (!request.body) {
    console.log(request.body)
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const {modelId, userId} = request.params

  return Model.updateModel(modelId, userId, request.body, (error, data) => {
    if (error) {
      console.log(error)
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de model numéro ${modelId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer une model n° ${modelId}`
      });
    }
    return response.status(200).send(data);
  });
};