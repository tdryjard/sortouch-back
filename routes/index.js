const express = require('express');
const question = require('./creating_area/question.route')
const response = require('./creating_area/reply.route')
const destination = require('./creating_area/destination.route')
const container = require('./creating_area/container.route')
const relation = require('./creating_area/relation_container.route')
const category = require('./message_space/category.route')
const model = require('./model_space/model.route')
const mail = require('./mail/mail.route')
const user = require('./register/register.route')

const router = express.Router();

router.use('/question', question);

router.use('/response', response);

router.use('/destination', destination)

router.use('/container', container)

router.use('/relation', relation)

router.use('/category', category)

router.use('/model', model)

router.use('/mail', mail)

router.use('/user', user)

module.exports = router;