const express = require('express');
const container = require('../../controllers/creating_area/chatbot/container.controller');

const router = express.Router()

router.get('/', container.findChatBot)

router.get('/findAll/:userId/:responseId/:modelId', container.findContainers)

module.exports = router;