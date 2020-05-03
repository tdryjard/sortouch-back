const db = require('../database')

const Mail = function createMail(mail) {
    this.phone = mail.phone;
    this.email = mail.email;
    this.message = mail.message;
    this.category_id = mail.category_id;
    this.model_id = mail.model_id;
    this.user_id = mail.user_id;
    this.view = mail.view;
    this.color = mail.color;
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

Mail.findMailByUser = (userId, result) => {
  db.query(
    'SELECT * FROM mail WHERE user_id = ?',
    [userId],
    (error, dbResult) => {
      if (error) {
        console.log(error)
        return result(error, null);
      }

      if (dbResult.length) {
        return result(null, dbResult);
      }

      return result({ kind: 'not_found' }, null);
    }
  );
};

Mail.findMailByCategory = (userId, modelId, categoryId, result) => {
    db.query(
      'SELECT * FROM mail WHERE user_id = ? AND model_id = ? AND category_id = ?',
      [userId, modelId, categoryId],
      (error, dbResult) => {
        if (error) {
          console.log(error)
          return result(error, null);
        }
  
        if (dbResult.length) {
          return result(null, dbResult);
        }
  
        return result({ kind: 'not_found' }, null);
      }
    );
  };

Mail.updateMail = (userId, modelId, categoryId, mailId, mail, result) => {
  db.query('UPDATE mail SET ? WHERE id = ? AND user_id = ? AND model_id = ? AND category_id = ?', [mail, mailId, userId, modelId, categoryId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    return result(null, { ...mail });
  });
};

Mail.updateMailWithId = (mailId, mail, result) => {
  db.query('UPDATE mail SET ? WHERE id = ?', [mail, mailId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    return result(null, { ...mail });
  });
};

Mail.deleteMail = (mailId, userId, modelId, result) => {
  db.query('DELETE FROM mail WHERE id = ? AND user_id = ? AND model_id = ?', [mailId, userId, modelId], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `mail #${mailId} supprimée`,
      status: 200
    });
  });
};

module.exports = Mail