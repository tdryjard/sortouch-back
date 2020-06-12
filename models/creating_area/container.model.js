const db = require('../database')

const Container = function createContainer(container) {
    this.content_type = container.content_type;
    this.user_id = container.user_id;
    this.ordering = container.ordering;
    this.response_id = container.response_id;
    this.model_id = container.model_id;
}

Container.createContainer = (newContainer, result) => {
    db.query('INSERT INTO container SET ?', [newContainer], (error, dbResult) => {
        if (error){
            console.log(error)
            return result(error, null)
        }
        return result(null, {id: dbResult.insertId, ...newContainer})
    })
};

Container.findContainers = (userId, responseId, modelId, result) => {
    db.query(
      `SELECT * FROM container WHERE user_id = ? AND (response_id = ? OR response_id IS NULL) AND model_id = ? ORDER BY ordering ASC`,
      [userId, responseId, modelId],
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

Container.findChatbot = (modelId, userId, responseId, result) => {
  db.query(
    'SELECT * FROM container WHERE user_id = ? AND response_id = ? AND model_id = ? OR response_id IS NULL ORDER BY ordering ASC',
    [userId, modelId, responseId],
    (error, dbResult) => {
      if (error) {
        return result(error, null);
      }

      if (dbResult.length) {
        return result(null, dbResult);
      }

      return result({ kind: 'not_found' }, null);
    }
  );
};

Container.updateContainerOrder = (containerId, userId, modelId, container, result) => {
  db.query('UPDATE container SET ? WHERE id = ? AND user_id = ? AND model_id = ?', [container, containerId, userId, modelId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    return result(null, { ...container });
  });
};

Container.deleteContainerRelationResponse = (responseId, userId, modelId, result) => {
  db.query(
    `DELETE FROM container WHERE response_id = ? AND user_id = ? AND model_id = ?`,
    [responseId, userId, modelId],
    (err) => {
      if (err){
        console.log(err)
        return result({ message: err.message, status: 500 }, null);
      } 

    return result(null, {
      message: `Relation #${responseId} supprimée `,
      status: 200
    });
  });
};

Container.deleteContainer = (containerId, userId, modelId, result) => {
  db.query(
    `DELETE FROM container WHERE id = ? AND user_id = ? AND model_id = ?`,
    [containerId, userId, modelId],
    (err) => {
      if (err){
        return result({ message: err.message, status: 500 }, null);
      } 

    return result(null, {
      message: `container #${containerId} supprimée `,
      status: 200
    });
  });
};

Container.deleteByModel = (userId, modelId, result) => {
  db.query(
    `DELETE FROM container WHERE user_id = ? AND model_id = ?`,
    [userId, modelId],
    (err) => {
      if (err){
        return result({ message: err.message, status: 500 }, null);
      } 

    return result(null, {
      message: `containers supprimés `,
      status: 200
    });
  });
};

module.exports = Container;