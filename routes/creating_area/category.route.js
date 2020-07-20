const express = require('express')
const Category = require('../../controllers/creating_area/category.controller')

const router = express.Router()

router.post('/add', Category.createCategory)

router.delete('/delete/:categoryId/:userId/:modelId', Category.deleteCategory)

router.put('/update/:categoryId/:userId/:modelId', Category.updateCategory)

router.delete('/deleteByModel/:userId/:modelId', Category.deleteByModel)

module.exports = router