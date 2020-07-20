const Category = require('../../models/creating_area/category.model')
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie')

exports.createCategory = function createACategory(request, response) {

  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const category = new Category({
    name: request.body.name,
    user_id: request.body.user_id,
    model_id: request.body.model_id
  })

  return Category.createCategory(category, (error, data) => {
    if (error) {
      return response.status(500).send({
        message:
          error.message || 'Some error occurred while creating the category.'
      })
    }

    const checkingToken = checkToken(request, response)
    const checkingTokenCookie = checkTokenCookie(response, request)
    if ((checkingToken === false) || checkingTokenCookie === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }

    return response.status(201).send(data);
  })
}

exports.deleteCategory = (request, response) => {
  const { categoryId, userId, modelId } = request.params;
  Category.deleteCategory(categoryId, userId, modelId, (err, result) => {
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

exports.updateCategory = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const { categoryId, userId, modelId } = request.params

  return Category.updateCategory(categoryId, userId, modelId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de question numéro ${categoryId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer une question n° ${categoryId}`
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
  Category.deleteByModel(userId, modelId, (err, result) => {
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