const db = require('../../database')

const Reply = function createReply(reply) {
    this.content = reply.content;
    this.user_id = reply.user_id;
    this.model_id = reply.model_id;
}

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
  

module.exports = Reply;