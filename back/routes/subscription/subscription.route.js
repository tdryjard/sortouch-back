const express = require('express')
const subscription = require('../../controllers/subscription/subscription.controller')

const router = express.Router()

router.post('/create', subscription.create)

module.exports = router