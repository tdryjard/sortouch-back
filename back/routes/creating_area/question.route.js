const express = require('express');
const question = require('../../controllers/creating_area/question.controller');

const router = express.Router()

router.post('/add', question.createQuestion)

router.get('/findAll/:userId/:modelId', question.findQuestions)

router.delete('/delete/:questionId/:userId/:modelId', question.deleteQuestion)

router.put('/update/:questionId/:userId/:modelId', question.updateQuestion)

module.exports = router; 