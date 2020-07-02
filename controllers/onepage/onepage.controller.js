const Onepage = require('../../models/onepage/onepage.model')
const checkToken = require('../../middlewares/webToken/checkToken')

exports.createOnepage = function createAOnepage(request, response) {

  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const onepage = new Onepage({
    name: request.body.name,
    user_id: request.body.user_id,
    model_id: request.body.model_id
  })

  return Onepage.createOnepage(onepage, (error, data) => {
    if (error) {
      return response.status(500).send({
        message:
          error.message || 'Some error occurred while creating the category.'
      })
    }

    const checkingToken = checkToken(request, response)
    if (checkingToken === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }

    return response.status(201).send(data);
  })
}

exports.findOnepage = (request, response) => {
  Onepage.findOnepage(request.params.userId, request.params.modelId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found onepage with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving onepage with id ${request.params.userId}`
      });
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.findByName = (request, response) => {
  Onepage.findByName(request.params.name, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found onepage with name ${request.params.name}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving onepage with name ${request.params.name}`
      });
    }

    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.updateOnepage = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const { modelId, userId } = request.params

  return Onepage.updateOnepage(userId, modelId, request.body, (error, data) => {
    if (error) {
      console.log(error)
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `not found.`
        });
      }
      return response.status(500).send({
        message: `error server`
      });
    }

    const checkingToken = checkToken(request, response)
    if (checkingToken === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }
    
    return response.status(200).send(data);
  });
};

exports.deleteByModel = (request, response) => {
  const { userId, modelId } = request.params;
  Onepage.deleteByModel(userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
    if (checkingToken === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }

    return response.status(200).send(result);
  });
};