const express = require('express')
const Onepage = require('../../controllers/onepage/onepage.controller')

const router = express.Router()

router.post('/create', Onepage.createOnepage)

router.get('/find/:userId/:modelId', Onepage.findOnepage)

router.get('/findByName/:name', Onepage.findByName)

router.put('/update/:userId/:modelId', Onepage.updateOnepage)

router.delete('/deleteByModel/:userId/:modelId', Onepage.deleteByModel)

module.exports = router