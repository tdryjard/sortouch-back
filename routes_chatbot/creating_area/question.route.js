const express = require('express');
const question = require('../../controllers/creating_area/chatbot/question.controller');

const router = express.Router()

router.get('/findAll/:userId/:modelId', question.findQuestions)

module.exports = router; 