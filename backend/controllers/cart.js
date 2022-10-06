const Cart = require('../models/Cart')
const Product = require('../models/Product')

module.exports = {
    getCart: async (req, res) => {
        try {
            const userId = req.params.id
            console.log(req.body)
	        const cart = await Cart.findOne({userId})
	        res.render('cart', { cart: cart, })
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }, 

    addToCart: async (req, res) => {
        try {
            let userid = req.user.id
            let product = await Product.findOne({_id: req.params.id});
            if(!product){
                res.render('errors/404')
            } 
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }
}