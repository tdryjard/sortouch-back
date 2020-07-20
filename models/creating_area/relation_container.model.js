const db = require('../database')

const Relation = function createRelation(relation) {
    this.container_id = relation.container_id;
    this.question_id = relation.question_id;
    this.response_id = relation.response_id;
    this.category_id = relation.category_id;
    this.user_id = relation.user_id;
    this.model_id = relation.model_id;
}


Relation.createRelation = (newRelation, result) => {
    db.query('INSERT INTO relation_container SET ?', [newRelation], (error, dbResult) => {
        if (error){
            console.log(error)
            return result(error, null)
        }
        return result(null, {id: dbResult.insertId, ...newRelation})
    })
};

Relation.updateRelation = (userId, modelId, relation, result) => {
    db.query('UPDATE relation_container SET ? WHERE onchange = 1 AND user_id = ? AND model_id = ?', [relation, userId, modelId], (error, response) => {
      if (error) {
        console.log(error)
        return result(error, null);
      }
  
      if (response.affectedRows === 0) {
        return result({ kind: 'not_found' }, null);
      }
  
      return result(null, { ...relation });
    });
  };

Relation.deleteRelation = (containerId, userId, modelId, result) => {
  db.query(
    `DELETE FROM relation_container
    WHERE container_id = ? And user_id = ? AND model_id = ?`,
    [containerId, userId, modelId],
    (err) => {
      if (err){
        console.log(err)
        return result({ message: err.message, status: 500 }, null);
      } 

    return result(null, {
      message: `Relation #${containerId} supprimée `,
      status: 200
    });
  });
};

Relation.deleteRelationQuestion = (containerId, questionId, userId, modelId, result) => {
  db.query(
    `DELETE FROM relation_container
    WHERE container_id = ? And question_id = ? And user_id = ? AND model_id = ?`,
    [containerId, questionId, userId, modelId],
    (err) => {
      if (err){
        console.log(err)
        return result({ message: err.message, status: 500 }, null);
      } 

    return result(null, {
      message: `Relation #${questionId} - #${containerId} supprimée `,
      status: 200
    });
  });
};

Relation.deleteRelationResponse = (containerId, responseId, userId, modelId, result) => {
  db.query(
    `DELETE FROM relation_container
    WHERE container_id = ? And response_id = ? And user_id = ? AND model_id = ?`,
    [containerId, responseId, userId, modelId],
    (err) => {
      if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `Relation #${responseId} - #${containerId} supprimée `,
      status: 200
    });
  });
};

Relation.deleteAllRelationQuestion = (questionId, userId, modelId, result) => {
  db.query(
    `DELETE FROM relation_container WHERE question_id = ? AND user_id = ? AND model_id = ?`,
    [questionId, userId, modelId],
    (err) => {
      if (err){
        console.log(err)
        return result({ message: err.message, status: 500 }, null);
      } 

    return result(null, {
      message: `Relation #${questionId} supprimée `,
      status: 200
    });
  });
};

Relation.deleteAllRelationResponse = (responseId, userId, modelId, result) => {
  db.query(
    `DELETE FROM relation_container WHERE response_id = ? AND user_id = ? AND model_id = ?`,
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

Relation.deleteRelationOnChange = (userId, modelId, result) => {
  db.query(
    `DELETE FROM relation_container WHERE onchange = 1 AND user_id = ? AND model_id = ?`,
    [userId, modelId],
    (err) => {
      if (err){
        console.log(err)
        return result({ message: err.message, status: 500 }, null);
      } 

    return result(null, {
      message: `Relation supprimée `,
      status: 200
    });
  });
};

Relation.deleteByModel = (userId, modelId, result) => {
  db.query(
    `DELETE FROM relation_container WHERE user_id = ? AND model_id = ?`,
    [userId, modelId],
    (err) => {
      if (err){
        console.log(err)
        return result({ message: err.message, status: 500 }, null);
      } 

    return result(null, {
      message: `Relation supprimée `,
      status: 200
    });
  });
};

module.exports = Relation;