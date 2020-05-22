const db = require('../database')

const Subscription = function createSub(subscription) {
    this.email = subscription.email;
    this.society = subscription.society;
    this.phone = subscription.phone;
    this.user_id = subscription.user_id;
}
Subscription.create = (subscription, result) => {
    db.query('INSERT INTO subscription SET ?', [subscription], (error, dbResult) => {
      if (error) {
        return result(error, null);
      }
      return result(null, { id: dbResult.insertId, ...subscription });
    });
  };

  module.exports = Subscription