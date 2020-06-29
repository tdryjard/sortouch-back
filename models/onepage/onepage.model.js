const db = require('../database')

const Onepage = function createOnepage(model) {
    this.name = model.name;
    this.user_id = model.user_id;
    this.model_id = model.model_id;
}

Onepage.createOnepage = (newOnepage, result) => {
    db.query('INSERT INTO onepage SET ?', [newOnepage], (error, dbResult) => {
        if (error) {
            console.log(error)
            return result(error, null)
        }
        return result(null, { id: dbResult.insertId, ...newOnepage })
    })
};

Onepage.findOnepage = (userId, modelId, result) => {
    db.query(
        'SELECT * FROM onepage WHERE user_id = ? AND model_id = ?',
        [userId, modelId],
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

Onepage.findByName = (name, result) => {
    db.query(
        'SELECT * FROM onepage WHERE name = ?',
        [name],
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

Onepage.updateOnepage = (userId, modelId, onechange, result) => {
    db.query('UPDATE onepage SET ? WHERE user_id = ? AND model_id = ?', [onechange, userId, modelId], (error, response) => {
      if (error) {
        console.log(error)
        return result(error, null);
      }
  
      if (response.affectedRows === 0) {
        return result({ kind: 'not_found' }, null);
      }
  
      return result(null, { modelId: Number(modelId), ...onechange });
    });
  };

module.exports = Onepage