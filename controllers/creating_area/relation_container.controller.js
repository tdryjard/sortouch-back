const Relation = require('../../models/creating_area/relation_container.model');
const checkToken = require('../../middlewares/webToken/checkToken')

exports.createRelation = function createARelation(request, response) {

    if (!request.body) {
        return response.status(400).send({
          message: 'Content can not be empty!'
        });
      }

    const relation = new Relation({
        container_id : request.body.container_id,
        question_id : request.body.question_id,
        response_id : request.body.response_id,
        category_id : request.body.category_id,
        onChange : request.body.onChange,
        user_id : request.body.user_id,
        model_id : request.body.model_id
    })

    return Relation.createRelation(relation, (error, data) => {
        if(error){
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

exports.updateRelation = (request, response) => {
    console.log(request)
    if (!request.body) {
      response.status(400).send({
        message: 'Content can not be empty!'
      });
    }

    const {userId, modelId} = request.params
  
    return Relation.updateRelation(userId, modelId, request.body, (error, data) => {
      console.log(error)
      if (error) {
        if (error.kind === 'not_found') {
          return response.status(404).send({
            message: `pas de relation numéro.`
          });
        }
        return response.status(500).send({
          message: `nous ne pouvons pas vous attribuer une relation`
        });
      }

      const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }
      
      return response.status(200).send(data);
    });
  };

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

exports.deleteRelationQuestion = (request, response) => {
  const { questionId, containerId, userId, modelId } = request.params;
  Relation.deleteRelationQuestion(containerId, questionId, userId, modelId, (err, result) => {
    if (err !== null) {
      console.log(err)
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }

    return response.status(200).send(result);
  });
};

exports.deleteRelationResponse = (request, response) => {
  const { responseId, containerId, userId, modelId } = request.params;
  Relation.deleteRelationResponse(containerId, responseId, userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }

    return response.status(200).send(result);
  });
};

exports.deleteAllRelationQuestion = (request, response) => {
  const { questionId, userId, modelId } = request.params;
  Relation.deleteAllRelationQuestion(questionId, userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }

    return response.status(200).send(result);
  });
};

exports.deleteAllRelationResponse = (request, response) => {
  const { responseId, userId, modelId } = request.params;
  Relation.deleteAllRelationResponse(responseId, userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }

    return response.status(200).send(result);
  });
};

exports.deleteRelation = (request, response) => {
  const { containerId, userId, modelId } = request.params;
  Relation.deleteRelation(containerId, userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }

    return response.status(200).send(result);
  });
};

exports.deleteRelationOnChange = (request, response) => {
  const { userId, modelId } = request.params;
  Relation.deleteRelationOnChange(userId, modelId, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    const checkingToken = checkToken(request, response)
      if(checkingToken === false){
        return response.status(400).send({
          message: 'error token'
        })
      }
      
    return response.status(200).send(result);
  });
};