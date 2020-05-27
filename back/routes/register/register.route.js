const express = require('express')
const User = require('../../controllers/register/register.controller')

const router = express.Router()

router.post('/create', User.create)

router.post('/connect', User.connect)

module.exports = router