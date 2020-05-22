const regexValidity = require('./regexValidity');

module.exports = function verifyPassword(password, min, max) {
  const regex = new RegExp(/^[a-zA-Z0-9]+$/);
  const regexError = regexValidity({ password }, regex);
  if (regexError) return regexError;

  if (min > password.length || password.length > max) {
    return {
      type: 'INPUT',
      inputs: ['password'],
      alert: {
        type: 'error',
        text: `Mot de passe invalide. (min: ${min} - max: ${max})`
      }
    };
  }

  return null;
};
