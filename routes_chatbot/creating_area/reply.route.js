const express = require('express');
const reply = require('../../../controllers/creating_area/chatbot/reply.controller');

const router = express.Router()

router.get('/findAll/:userId/:modelId', reply.findReply)

module.exports = router; 