const express = require('express')
const router = express()
const orderController = require('../controllers/order')

router.get('/', orderController.getOrder)
router.post('/', orderController.checkout)

module.exports = router