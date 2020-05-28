const express = require('express')
const Model = require('../../controllers/model_space/model.controller')

const router = express.Router()

router.post('/add', Model.createModel)

router.get('/findAll/:userId', Model.findModel)

router.delete('/delete/:modelId/:userId', Model.deleteModel)

router.put('/update/:modelId/:userId', Model.updateModel)

module.exports = router