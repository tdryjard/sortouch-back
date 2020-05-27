const Contact = require('../../models/contact/contact.model.js')
const checkToken = require('../../middlewares/webToken/checkToken')


exports.createContact = function createAContact(request, response) {

    if (!request.body) {
      return response.status(400).send({
        message: 'Content can not be empty!'
      });
    }
  
    const contact = new Contact({
      phone: request.body.phone,
      email: request.body.email,
      category_id: request.body.category_id,
      model_id: request.body.model_id,
      user_id: request.body.user_id,
      color: request.body.color
    })
  
    return Contact.createContact(contact, (error, data) => {
      if (error) {
        console.log(error)
        return response.status(500).send({
          message:
            error.message || 'Some error occurred while creating a contact.'
        })
      }
  
      return response.status(201).send(data);
    })
  }
  
  exports.findContactByUser = (request, response) => {
    Contact.findContactByUser(request.params.userId, (error, dbResult) => {
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
      if (checkingToken === false) {
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
  
    const {contactId} = request.params
  
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
      if (checkingToken === false) {
        return response.status(400).send({
          message: 'error token'
        })
      }
  
      return response.status(200).send(data);
    });
  };