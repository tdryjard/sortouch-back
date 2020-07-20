const express = require('express');
const question = require('../../controllers/creating_area/question.controller');

const router = express.Router()

router.post('/add', question.createQuestion)

router.delete('/delete/:questionId/:userId/:modelId', question.deleteQuestion)

router.delete('/deleteByModel/:userId/:modelId', question.deleteByModel)

router.put('/update/:questionId/:userId/:modelId', question.updateQuestion)

module.exports = router; 