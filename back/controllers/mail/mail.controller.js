const Mail = require('../../models/mail/mail.model')
const checkToken = require('../../middlewares/webToken/checkToken')

exports.createMail = function createAMail(request, response) {

  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const mail = new Mail({
    phone: request.body.phone,
    email: request.body.email,
    message: request.body.message,
    category_id: request.body.category_id,
    model_id: request.body.model_id,
    user_id: request.body.user_id,
    view: request.body.view
  })

  return Mail.createMail(mail, (error, data) => {
    if (error) {
      console.log(error)
      return response.status(500).send({
        message:
          error.message || 'Some error occurred while creating the question.'
      })
    }

    return response.status(201).send(data);
  })
}

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
    if (checkingToken === false) {
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
    if (checkingToken === false) {
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
    if (checkingToken === false) {
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
    if (checkingToken === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }

    return response.status(200).send(data);
  });
};

exports.deleteMail = (request, response) => {
  const { mailId, userId, modelId } = request.params;
  Mail.deleteMail(mailId, userId, modelId, (err, result) => {
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