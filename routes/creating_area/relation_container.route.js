const express = require('express');
const relation = require('../../controllers/creating_area/relation_container.controller');

const router = express.Router()

router.post('/add', relation.createRelation)

router.put('/update/:userId/:modelId', relation.updateRelation)

router.delete('/deleteQuestionCard/:containerId/:questionId/:userId/:modelId', relation.deleteRelationQuestion)

router.delete('/deleteResponseCard/:containerId/:responseId/:userId/:modelId', relation.deleteRelationResponse)

router.delete('/deleteAllRelationQuestion/:questionId/:userId/:modelId', relation.deleteAllRelationQuestion)

router.delete('/deleteAllRelationResponse/:responseId/:userId/:modelId', relation.deleteAllRelationResponse)

router.delete('/delete/:containerId/:userId/:modelId', relation.deleteRelation)

router.delete('/delete/:userId/:modelId', relation.deleteRelationOnChange)

router.delete('/deleteByModel/:userId/:modelId', relation.deleteByModel)

module.exports = router;