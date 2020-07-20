const express = require('express');
const relation = require('../../../controllers/creating_area/chatbot/relation_container.controller');

const router = express.Router()

router.get('/find/:userId/:modelId', relation.findRelation)

router.get('/findCardQuestion/:containerId/:userId/:modelId', relation.findRelationCardQuestion)

router.get('/findCardResponse/:containerId/:userId/:modelId', relation.findRelationCardResponse)

router.get('/findCardCategory/:containerId/:userId/:modelId', relation.findRelationCardCategory)

module.exports = router;