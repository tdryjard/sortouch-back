const express = require('express')
const Category = require('../../../controllers/creating_area/chatbot/category.controller')

const router = express.Router()

router.get('/findAll/:userId/:modelId', Category.findCategory)

module.exports = router