const db = require('../database')


const Contact = function createContact(mail) {
  this.phone = mail.phone;
  this.email = mail.email;
  this.category_id = mail.category_id;
  this.model_id = mail.model_id;
  this.user_id = mail.user_id;
  this.color = mail.color;
}

Contact.createContact = (contact, result) => {
  db.query('INSERT INTO contact SET ?', [contact], (error, dbResult) => {
    if (error) {
      console.log(error)
      return result(error, null)
    }
    return result(null, { id: dbResult.insertId, ...contact })
  })
};

module.exports = Contact