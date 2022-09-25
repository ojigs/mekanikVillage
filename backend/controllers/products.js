const Seller = require('../models/Seller')

module.exports = {
    getShop: async (req, res) => {
        try {
            res.render('shop', { shop: req.user })
        } catch (error) {
            console.log(error)
        }
    }
}