const db = require('../database')

const Reply = function createReply(reply) {
    this.content = reply.content;
    this.user_id = reply.user_id;
    this.model_id = reply.model_id;
}

Reply.createReply = (newReply, result) => {
    db.query('INSERT INTO response SET ?', [newReply], (error, dbResult) => {
        if (error){
          console.log(error)
            return result(error, null)
        }
        return result(null, {id: dbResult.insertId, ...newReply})
    })
};

Reply.findReply = (userId, modelId, result) => {
    db.query(
      'SELECT * FROM response WHERE user_id = ? AND model_id = ?',
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

Reply.deleteReply = (replyId, userId, modelId, result) => {
  db.query('DELETE FROM response WHERE id = ? AND user_id = ? AND model_id = ?', [replyId, userId, modelId], err => {
    if (err){
      console.log(err)
      return result({ message: err.message, status: 500 }, null);
    }

    return result(null, {
      message: `Destination #${replyId} supprimée`,
      status: 200
    });
  });
};


Reply.updateReply = (replyId, userId, modelId, reply, result) => {
  db.query('UPDATE response SET ? WHERE id = ? AND user_id = ? AND model_id = ?', [reply, replyId, userId, modelId], (error, reply) => {
    console.log(error)
    if (error) {
      return result(error, null);
    }

    return result(null, { replyId: Number(replyId), ...reply });
  });
};
  

module.exports = Reply;