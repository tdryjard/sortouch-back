const db = require('../../database')

const Relation = function createRelation(relation) {
    this.container_id = relation.container_id;
    this.question_id = relation.question_id;
    this.response_id = relation.response_id;
    this.category_id = relation.category_id;
    this.user_id = relation.user_id;
    this.model_id = relation.model_id;
}

Relation.findRelation = (userId, modelId, result) => {
  db.query(
    'SELECT * FROM relation_container WHERE user_id = ? AND model_id = ?',
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

Relation.findRelationCardQuestion = (containerId, userId, modelId, result) => {
  db.query(
    `SELECT question.content, question.id FROM relation_container
    JOIN question ON relation_container.question_id = question.id
    WHERE relation_container.container_id = ? And relation_container.user_id = ? AND relation_container.model_id = ?`,
    [containerId, userId, modelId],
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

Relation.findRelationCardResponse = (containerId, userId, modelId, result) => {
  db.query(
    `SELECT response.content, response.id FROM relation_container
    JOIN response ON relation_container.response_id = response.id
    WHERE relation_container.container_id = ? And relation_container.user_id = ? AND relation_container.model_id = ?`,
    [containerId, userId, modelId],
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

Relation.findRelationCardCategory = (containerId, userId, modelId, result) => {
  db.query(
    `SELECT category.name, category.id FROM relation_container
    JOIN category ON relation_container.category_id = category.id
    WHERE relation_container.container_id = ? And relation_container.user_id = ? AND relation_container.model_id`,
    [containerId, userId, modelId],
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

module.exports = Relation;