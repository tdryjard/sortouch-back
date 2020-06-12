const db = require('../database')

const Category = function createCategory(category) {
    this.name = category.name;
    this.user_id = category.user_id;
    this.model_id = category.model_id;
}

Category.createCategory = (newCategory, result) => {
    db.query('INSERT INTO category SET ?', [newCategory], (error, dbResult) => {
        if (error){
            console.log(error)
            return result(error, null)
        }
        categoryId = dbResult.insertId
        return result(null, {id: dbResult.insertId, ...newCategory})
    })
};

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

Category.deleteCategory = (categoryId, userId, modelId, result) => {
  db.query('DELETE FROM category WHERE id = ? AND user_id = ? AND model_id = ?', [categoryId, userId, modelId], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `category #${categoryId} supprimée`,
      status: 200
    });
  });
};

Category.updateCategory = (categoryId, userId, modelId, category, result) => {
  db.query('UPDATE category SET ? WHERE id = ? AND user_id = ? AND model_id = ?', [category, categoryId, userId, modelId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      return result({ kind: 'not_found' }, null);
    }

    return result(null, { categoryId: Number(categoryId), ...category });
  });
};



Category.deleteByModel = (userId, modelId, result) => {
  db.query('DELETE FROM category WHERE user_id = ? AND model_id = ?', [userId, modelId], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `Destinations supprimées`,
      status: 200
    });
  });
};

module.exports = Category;