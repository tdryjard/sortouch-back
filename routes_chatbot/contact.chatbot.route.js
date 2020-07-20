const express = require('express');
const contact = require('../../controllers/contact/contact.chatbot.controller')

const router = express.Router()

router.post('/create', contact.createContact)

module.exports = router