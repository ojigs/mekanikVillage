const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const sellerAuthController = require('../controllers/sellerAuth')
const userAuthController = require('../controllers/userAuth')

router.get('/', homeController.getIndex)
router.get('/sellerSignup', sellerAuthController.getSignup)
router.post('/sellerSignup', sellerAuthController.postSignup)
router.get('/sellerLogin', sellerAuthController.getLogin)
router.post('/sellerLogin', sellerAuthController.postLogin)
router.get('/logout', sellerAuthController.logout)

//user route
router.get('/userSignup', userAuthController.getSignup)
router.post('/userSignup', userAuthController.postSignup)
router.get('/userLogin', userAuthController.getLogin)
router.post('/userLogin', userAuthController.postLogin)

module.exports = router