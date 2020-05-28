const db = require('../database')

const Model = function createModel(model) {
    this.name = model.name;
    this.user_id = model.user_id;
}

Model.createModel = (newModel, result) => {
    db.query('INSERT INTO model SET ?', [newModel], (error, dbResult) => {
        if (error){
            console.log(error)
            return result(error, null)
        }
        modelId = dbResult.insertId
        return result(null, {id: dbResult.insertId, ...newModel})
    })
};

Model.findModel = (userId, result) => {
    db.query(
      'SELECT * FROM model WHERE user_id = ?',
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

Model.deleteModel = (modelId, userId, result) => {
  db.query('DELETE FROM model WHERE id = ? AND user_id = ?', [modelId, userId], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `model #${modelId} supprimée`,
      status: 200
    });
  });
};

Model.updateModel = (modelId, userId, model, result) => {
  db.query('UPDATE model SET ? WHERE id = ? AND user_id = ?', [model, modelId, userId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      return result({ kind: 'not_found' }, null);
    }

    return result(null, { modelId: Number(modelId), ...model });
  });
};

module.exports = Model