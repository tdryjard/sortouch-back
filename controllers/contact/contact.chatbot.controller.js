const Contact = require('../../models/contact/contact.chatbot.model')


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
      return response.status(500).send({
        message:
          error.message || 'Some error occurred while creating a contact.'
      })
    }

    return response.status(201).send(data);
  })
}