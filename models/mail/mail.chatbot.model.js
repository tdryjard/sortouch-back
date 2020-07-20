const db = require('../database')

const Mail = function createMail(mail) {
    this.phone = mail.phone;
    this.email = mail.email;
    this.message = mail.message;
    this.category_id = mail.category_id;
    this.model_id = mail.model_id;
    this.user_id = mail.user_id;
    this.view = mail.view;
    this.date = mail.date;
}


Mail.createMail = (mail, result) => {
  db.query('INSERT INTO mail SET ?', [mail], (error, dbResult) => {
      if (error){
          console.log(error)
          return result(error, null)
      }
      return result(null, {id: dbResult.insertId, ...mail})
  })
};

module.exports = Mail