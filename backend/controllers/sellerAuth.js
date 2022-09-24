const passport = require('passport')
const validator = require('validator')
const Seller = require('../models/Seller')

exports.getSignup = (req, res) => {
    if (req.seller) {
        return res.redirect('/profile')
    }
    res.render('sellerSignup')
}