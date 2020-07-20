const db = require('../database')


const Contact = function createContact(mail) {
  this.phone = mail.phone;
  this.email = mail.email;
  this.category_id = mail.category_id;
  this.model_id = mail.model_id;
  this.user_id = mail.user_id;
  this.color = mail.color;
}

Contact.findContactByUser = (userId, result) => {
  db.query(
    'SELECT * FROM contact WHERE user_id = ?',
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

Contact.updateContact = (contactId, contact, result) => {
  db.query('UPDATE contact SET ? WHERE id = ?', [contact, contactId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    return result(null, { ...contact });
  });
};

Contact.deleteByModel = (userId, modelId, result) => {
  db.query('DELETE FROM contact WHERE user_id = ? AND model_id = ?', [userId, modelId], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `contacts supprimés`,
      status: 200
    });
  });
};

Contact.delete = (id, result) => {
  db.query('DELETE FROM contact WHERE id = ?', [id], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `contact supprimée`,
      status: 200
    });
  });
};

module.exports = Contact