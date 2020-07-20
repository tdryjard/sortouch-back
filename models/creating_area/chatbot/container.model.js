const db = require('../../database')

const Container = function createContainer(container) {
    this.content_type = container.content_type;
    this.user_id = container.user_id;
    this.ordering = container.ordering;
    this.response_id = container.response_id;
    this.model_id = container.model_id;
}

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

module.exports = Container;