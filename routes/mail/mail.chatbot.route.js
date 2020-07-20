const express = require('express');
const mail = require('../../controllers/mail/mail.chatbot.controller')

const router = express.Router()

router.post('/create', mail.createMail)

module.exports = router