const Mail = require('../../models/mail/mail.model')
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie')

exports.findMailByUser = (request, response) => {
  Mail.findMailByUser(request.params.userId, (error, dbResult) => {
    console.log(error)
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found mail with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving mail with id ${request.params.userId}`
      });
    }

    const checkingToken = checkToken(request, response)
    const checkingTokenCookie = checkTokenCookie(response, request)
    if ((checkingToken === false) || checkingTokenCookie === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }

    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.findMailByCategory = (request, response) => {
  Mail.findMailByCategory(request.params.userId, request.params.modelId, request.params.categoryId, (error, dbResult) => {
    console.log(error)
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found mail with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving mail with id ${request.params.userId}`
      });
    }

    const checkingToken = checkToken(request, response)
    const checkingTokenCookie = checkTokenCookie(response, request)
    if ((checkingToken === false) || checkingTokenCookie === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.updateMail = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const { userId, modelId, mailId, categoryId } = request.params

  return Mail.updateMail(userId, modelId, categoryId, mailId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de mail numéro ${mailId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer un mail n° ${mailId}`
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

exports.updateMailWithId = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const {mailId} = request.params

  return Mail.updateMailWithId(mailId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de mail numéro ${mailId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer un mail n° ${mailId}`
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

exports.deleteMail = (request, response) => {
  const { userId } = request.params;
  Mail.deleteMail(userId, (err, result) => {
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

exports.deleteByModel = (request, response) => {
  const { userId, modelId } = request.params;
  Mail.deleteByModel(userId, modelId, (err, result) => {
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