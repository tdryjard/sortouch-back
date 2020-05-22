const Destination = require('../../models/creating_area/destination.model');
const checkToken = require('../../middlewares/webToken/checkToken')

exports.createDestination = function createADestination(request, response) {

    if (!request.body) {
        return response.status(400).send({
          message: 'Content can not be empty!'
        });
      }

    const destination = new Destination({
        liens: request.body.liens,
        ancre: request.body.ancre,
        user_id: request.body.user_id,
        model_id: request.body.model_id,
    })

    return Destination.createDestination(destination, (error, data) => {
        console.log(error)
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


exports.findDestinations = (request, response) => {
    Destination.findDestinations(request.params.userId, request.params.modelId, (error, dbResult) => {
      console.log(error)
      if (error !== null) {
        if (error.kind === 'not_found') {
          return response.status(404).send({
            message: `Not found reply with id ${request.params.userId}.`
          });
        }
        return response.status(500).send({
          message: `Error retrieving reply with id ${request.params.userId}`
        });
      }
      // Envoi de la réponse
      return response.status(200).send(dbResult);
    });
  };

exports.deleteDestination = (request, response) => {
  const { destinationId, userId, modelId } = request.params;
  Destination.deleteDestination(destinationId, userId, modelId, (err, result) => {
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

exports.updateDestination = (request, response) => {
  console.log(request)
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const {destinationId, userId, modelId} = request.params

  return Destination.updateDestination(destinationId, userId, modelId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas de question numéro ${destinationId}.`
        });
      }
      return response.status(500).send({
        message: `nous ne pouvons pas vous attribuer une destination n° ${destinationId}`
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