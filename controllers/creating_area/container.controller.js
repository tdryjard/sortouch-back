const Container = require('../../models/creating_area/container.model');
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie')

exports.createContainer = function createAContainer(request, response) {

    if (!request.body) {
        return response.status(400).send({
          message: 'Content can not be empty!'
        });
      }

    const container = new Container({
        content_type: request.body.content_type,
        user_id : request.body.user_id,
        ordering: request.body.ordering,
        response_id: request.body.response_id,
        model_id: request.body.model_id
    })

    return Container.createContainer(container, (error, data) => {
        if(error){
            console.log(error)
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

    return response.status(201).send(data);
})
}

exports.updateContainerOrder = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const {containerId, modelId, userId} = request.params

  return Container.updateContainerOrder(containerId, modelId, userId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de container numéro ${containerId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer un container n° ${containerId}`
      });
    }

    const checkingToken = checkToken(request, response)
    const checkingTokenCookie = checkTokenCookie(response, request)
    if ((checkingToken === false) || checkingTokenCookie === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }

    return response.status(200).send(data);
  });
};

exports.deleteContainerRelationResponse = (request, response) => {
  const { responseId, userId, modelId } = request.params;
  Container.deleteContainerRelationResponse(responseId, userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
    const checkingTokenCookie = checkTokenCookie(response, request)
    if ((checkingToken === false) || checkingTokenCookie === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }

    return response.status(200).send(result);
  });
};

exports.deleteContainer = (request, response) => {
  const { containerId, userId, modelId } = request.params;
  Container.deleteContainer(containerId, userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
    const checkingTokenCookie = checkTokenCookie(response, request)
    if ((checkingToken === false) || checkingTokenCookie === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }
      
    return response.status(200).send(result);
  });
};

exports.deleteByModel = (request, response) => {
  const { userId, modelId } = request.params;
  Container.deleteByModel(userId, modelId,(err, result) => {
    console.log(err)
    if (err !== null) {
      return response.status(err.status).send(err);
    }

      const checkingToken = checkToken(request, response)
      const checkingTokenCookie = checkTokenCookie(response, request)
      if ((checkingToken === false) || checkingTokenCookie === false) {
        return response.status(400).send({
          message: 'error token'
        })
      }
      
    return response.status(200).send(result);
  });
};