const Reply = require('../../models/creating_area/reply.model');
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie')

exports.createReply = function createAResponse(request, response) {

  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const reply = new Reply({
    content: request.body.content,
    user_id: request.body.user_id,
    model_id: request.body.model_id
  })

  return Reply.createReply(reply, (error, data) => {
    if (error) {
      return response.status(500).send({
        message:
          error.message || 'Some error occurred while creating the Response.'
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

exports.deleteReply = (request, response) => {
  const { replyId, userId, modelId } = request.params;
  Reply.deleteReply(replyId, userId, modelId, (err, result) => {
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
  Reply.deleteByModel(userId, modelId, (err, result) => {
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

exports.updateReply = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const { replyId, userId, modelId } = request.params

  return Reply.updateReply(replyId, userId, modelId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de Response numéro ${replyId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer une Response n° ${replyId}`
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