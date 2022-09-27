const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products')

router.get('/:id', productsController.getProduct)

module.exports = router