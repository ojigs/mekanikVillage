const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const storeController = require('../controllers/store')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', ensureAuth, storeController.getStore)
router.get('/list', storeController.listProducts)
router.post('/createProduct', upload.single("file"), storeController.createProduct)

module.exports = router