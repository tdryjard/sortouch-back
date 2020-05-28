const express = require('express')
const Category = require('../../controllers/message_space/category.controller')

const router = express.Router()

router.post('/add', Category.createCategory)

router.get('/findAll/:userId/:modelId', Category.findCategory)

router.delete('/delete/:categoryId/:userId/:modelId', Category.deleteCategory)

router.put('/update/:categoryId/:userId/:modelId', Category.updateCategory)

module.exports = router