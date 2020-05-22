const db = require('../database')

const Destination = function createDestination(destination) {
    this.liens = destination.liens;
    this.ancre = destination.ancre;
    this.user_id = destination.user_id;
    this.model_id = destination.model_id;
}

Destination.createDestination = (newDestination, result) => {
    db.query('INSERT INTO destination SET ?', [newDestination], (error, dbResult) => {
        if (error){
          console.log(error)
            return result(error, null)
        }
        return result(null, {id: dbResult.insertId, ...newDestination})
    })
};

Destination.findDestinations = (userId, modelId, result) => {
    db.query(
      'SELECT * FROM destination WHERE user_id = ? AND model_id = ?',
      [userId,modelId],
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

Destination.deleteDestination = (destinationId, userId, modelId, result) => {
  db.query('DELETE FROM destination WHERE id = ? AND user_id = ? AND model_id = ?', [destinationId, userId, modelId], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `Destination #${destinationId} supprimée`,
      status: 200
    });
  });
};

Destination.updateDestination = (destinationId, destination, userId, modelId, result) => {
  db.query('UPDATE destination SET ? WHERE id = ? AND user_id = ? AND model_id = ?', [destination, destinationId, userId, modelId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    return result(null, { destinationId: Number(destinationId), ...destination });
  });
};
  

module.exports = Destination;