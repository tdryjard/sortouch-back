const Contact = require('../../models/contact/contact.model.js')
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie')

exports.findContactByUser = (request, response) => {
  Contact.findContactByUser(request.params.userId, async (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found contact with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving contact with id ${request.params.userId}`
      });
    }

    const checkingToken = checkToken(request, response)
    const checkingTokenCookie = await checkTokenCookie(response, request)
    if ((checkingToken === false) || checkingTokenCookie === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

exports.updateContact = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const { contactId } = request.params

  return Contact.updateContact(contactId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de contact numéro ${contactId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer un contact n° ${contactId}`
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

exports.deleteByModel = (request, response) => {
  const { userId, modelId } = request.params;
  Contact.deleteByModel(userId, modelId, (err, result) => {
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

exports.delete = (request, response) => {
  const { id } = request.params;
  Contact.delete(id, (err, result) => {
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