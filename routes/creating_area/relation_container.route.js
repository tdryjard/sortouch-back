const express = require('express');
const relation = require('../../controllers/creating_area/relation_container.controller');

const router = express.Router()

router.post('/add', relation.createRelation)

router.put('/update/:userId/:modelId', relation.updateRelation)

router.get('/find/:userId/:modelId', relation.findRelation)

router.get('/findCardQuestion/:containerId/:userId/:modelId', relation.findRelationCardQuestion)

router.get('/findCardResponse/:containerId/:userId/:modelId', relation.findRelationCardResponse)

router.get('/findCardCategory/:containerId/:userId/:modelId', relation.findRelationCardCategory)

router.delete('/deleteQuestionCard/:containerId/:questionId/:userId/:modelId', relation.deleteRelationQuestion)

router.delete('/deleteResponseCard/:containerId/:responseId/:userId/:modelId', relation.deleteRelationResponse)

router.delete('/deleteAllRelationQuestion/:questionId/:userId/:modelId', relation.deleteAllRelationQuestion)

router.delete('/deleteAllRelationResponse/:responseId/:userId/:modelId', relation.deleteAllRelationResponse)

router.delete('/delete/:containerId/:userId/:modelId', relation.deleteRelation)

router.delete('/delete/:userId/:modelId', relation.deleteRelationOnChange)

module.exports = router;