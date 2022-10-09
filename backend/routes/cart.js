const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')

router.get('/', cartController.getCart)
router.post('/:id', cartController.addToCart)
router.put('/reduce/:id', cartController.reduceQuantity)
router.put('/increase/:id', cartController.increaseQuantity)

module.exports = router