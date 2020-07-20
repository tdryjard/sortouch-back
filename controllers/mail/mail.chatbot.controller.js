const Mail = require('../../models/mail/mail.chatbot.model')

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
    view: request.body.view,
    date: request.body.date
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