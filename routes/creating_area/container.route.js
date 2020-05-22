const express = require('express');
const container = require('../../controllers/creating_area/container.controller');

const router = express.Router()

router.post('/create', container.createContainer)

router.get('/', container.findChatBot)

router.get('/findAll/:userId/:responseId/:modelId', container.findContainers)

router.put('/updateOrder/:containerId/:userId/:modelId', container.updateContainerOrder)

router.delete('/deleteContainerRelationResponse/:responseId/:userId/:modelId', container.deleteContainerRelationResponse)

router.delete('/delete/:containerId/:userId/:modelId', container.deleteContainer)

module.exports = router;