const Subscription = require('../../models/subscription/subscription.model');
const checkToken = require('../../middlewares/webToken/checkToken')

exports.create = function createASubscription(request, response) {

    if (!request.body) {
        return response.status(400).send({
          message: 'Content can not be empty!'
        });
      }

    const subscription = new Subscription({
        email: request.body.email,
        society: request.body.society,
        phone: request.body.phone,
        user_id: request.body.user_id
    })

    return Subscription.create(subscription, (error, data) => {
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