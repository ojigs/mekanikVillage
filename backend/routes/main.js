const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const sellerAuthController = require('../controllers/sellerAuth')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', homeController.getIndex)
router.get('/sellerSignup', sellerAuthController.getSignup)

module.exports = router