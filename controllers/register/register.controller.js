const bcrypt = require('bcrypt');
const User = require('../../models/register/register.model');
const verifyPassword = require('../../middlewares/formValidity/verifyPassword');
const noEmptyInputs = require('../../middlewares/formValidity/noEmptyInputs');
const regexValidity = require('../../middlewares/formValidity/regexValidity');
const regexList = require('../../utils/regexList');
const jwt = require('jsonwebtoken');
const clearNullProperty = require('../../utils/clearNullObjectProperty');
const checkToken = require('../../middlewares/webToken/checkToken')

// Creer un nouvel utilisateur
exports.create = function createUser(request, response) {
  const {
    email,
    password,
    type
  } = request.body;

  // Creer un utilisateur
  const user = new User({
    email: email || null,
    password: password || null,
    type: type || null
  });

  // Verification qu'aucune entrée obligatoire n'est vide
  const emptyInputsErrorHandler = noEmptyInputs(user);
  if (emptyInputsErrorHandler) {
    return response.status(400).send(emptyInputsErrorHandler);
  }

  // Verification que des entrées n'ont que des lettres
  const { emailRegex } = regexList;
  const emailCharactersErrorHandler = regexValidity({ email }, emailRegex);
  if (emailCharactersErrorHandler) {
    return response.status(400).send(emailCharactersErrorHandler);
  }

  // Verification mot de passe
  const passwordErrorHandler = verifyPassword(password, 8, 25);
  if (passwordErrorHandler) {
    return response.status(400).send(passwordErrorHandler);
  }

  // Encryptage du mot de passe
  user.password = bcrypt.hashSync(user.password, 10);

  // Enregistre un utilisateur
  return User.create(user, (error, data) => {
    if (error) {
      console.log(error)
      return response.status(500).send({
        message: error.message || 'Some error occurred while creating the user.'
      });
    }
    // Envoi de la réponse en status 201 soit (Created)
    return response.status(201).send({
      alert: {
        type: 'success',
        text: 'Vous êtes inscrit.'
      },
      data
    });
  });
};




exports.connect = function userConnectToTheWebsite(request, response) {
  const { email, password } = request.body;

  // Schéma d'erreur
  const errorScheme = {
    text: 'Email ou mot de passe incorrect',
    errorTarget: 'INPUT',
    alertType: 'error',
    inputs: ['email', 'password']
  };

  // Fonction créant une erreur avec status et infos variables
  const sendResponse = function responseSchemeForSending(
    status,
    { text = null, errorTarget = null, alertType, data = null, token = null, inputs = null }
  ) {
    return response.status(status).send(
      clearNullProperty({
        alert: {
          type: alertType,
          text
        },
        status,
        type: errorTarget,
        data,
        inputs,
        token
      })
    );
  };

  // Verification que des entrées n'ont que des lettres
  const { emailRegex } = regexList;
  const emailCharactersErrorHandler = regexValidity({ email }, emailRegex);
  if (emailCharactersErrorHandler) {
    return sendResponse(400, errorScheme);
  }

  return User.connect(email, (err, data) => {
    // Decryptage du mot de passe en base de données et verification d'une correspondance avec celui que l'utilisateur a rentrer
    
    if (password && data) {
      const samePassword = bcrypt.compareSync(password, data.password);
      if (!samePassword) return sendResponse(400, errorScheme);
    } else return sendResponse(400, errorScheme);

    if (err) {
      const { status } = err.status;
      return sendResponse(status, errorScheme);
    }

    // Génération du jsonWebToken
    const token = jwt.sign({ id: data.id }, `${process.env.SECRET_KEY}`);

    return sendResponse(200, {
      text: 'Vous êtes connecté.',
      data,
      token,
      alertType: 'success'
    });
  });
};

exports.update = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const {userId} = request.params

  return User.update(userId, request.body, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `pas trouvé de user ${contactId}. veuillez nous contacter`
        });
      }
      return response.status(500).send({
        message: `Problème connexion à la base de donnée, veuillez nous contacter en cas de problèmes`
      });
    }

    const checkingToken = checkToken(request, response)
    if (checkingToken === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }

    return response.status(200).send(data);
  });
};

exports.find = (request, response) => {
  User.find(request.params.userId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found user with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving user with id ${request.params.userId}`
      });
    }

    const checkingToken = checkToken(request, response)
    if (checkingToken === false) {
      return response.status(400).send({
        message: 'error token'
      })
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};