const db = require('../../database')

const Category = function createCategory(category) {
    this.name = category.name;
    this.user_id = category.user_id;
    this.model_id = category.model_id;
}

Category.findCategory = (userId, modelId, result) => {
    db.query(
      'SELECT * FROM category WHERE user_id = ? AND model_id = ?',
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

module.exports = Category;