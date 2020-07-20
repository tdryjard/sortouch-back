const express = require('express');
const questionChatbot = require('./creating_area/question.route')
const responseChatbot = require('./creating_area/reply.route')
const containerChatbot = require('./creating_area/container.route')
const relationChatbot = require('./creating_area/relation_container.route')
const categoryChatbot = require('./creating_area/category.route')
const mailChatbot = require('./mail.chatbot.route')
const contactChatbot = require('./contact.chatbot.route')

const router = express.Router();

const cors = require('cors');

// NO CORS

router.use('/question', cors({credentials: false, origin: '*'}), questionChatbot);

router.use('/response', cors({credentials: false, origin: '*'}), responseChatbot);

router.use('/container', cors({credentials: false, origin: '*'}), containerChatbot)

router.use('/relation', cors({credentials: false, origin: '*'}), relationChatbot)

router.use('/category', cors({credentials: false, origin: '*'}), categoryChatbot)

router.use('/mail', cors({credentials: false, origin: '*'}), mailChatbot)

router.use('/contact', cors({credentials: false, origin: '*'}), contactChatbot)

// NO CORS

module.exports = router;