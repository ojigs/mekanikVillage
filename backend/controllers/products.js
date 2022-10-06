const Product = require('../models/Product')

module.exports = {
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
	        res.render('product', { product: product})
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }
}