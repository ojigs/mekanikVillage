const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const sellerAuthController = require('../controllers/sellerAuth')
const productsController = require('../controllers/products')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', homeController.getIndex)
router.get('/sellerSignup', sellerAuthController.getSignup)
router.post('/sellerSignup', sellerAuthController.postSignup)
router.get('/sellerLogin', sellerAuthController.getLogin)
router.post('/sellerLogin', sellerAuthController.postLogin)
router.get('/shop', productsController.getShop)

module.exports = router