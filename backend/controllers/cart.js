const Cart = require('../models/Cart')
const Product = require('../models/Product')

module.exports = {
    getCart: async (req, res) => {
        try {
            const userId = req.user.id
	        const cart = await Cart.findOne({userId}).sort({date: -1})
	        res.render('cart', { cart: cart, })
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }, 

    addToCart: async (req, res) => {
        try {
            if (!req.user) {
                return res.redirect('/userLogin')
            }
            let userId = req.user.id
            let cart = await Cart.findOne({userId})
            let product = await Product.findOne({_id: req.params.id});
            const productId = product._id
            const quantity = Number(req.body.quantity)
            if(!product){
                res.render('errors/404')
            } 
            const price = product.price;
            const name = product.name;
            const image = product.image;

            if(cart){
                // if cart exists for the user
                let itemIndex = cart.items.findIndex(p => p.productId == productId);
    
                // Check if product exists or not
                if(itemIndex > -1)
                {
                    let productItem = cart.items[itemIndex];
                    productItem.quantity += quantity;
                    cart.items[itemIndex] = productItem;
                }
                else {
                    cart.items.push({ productId, name, image, quantity, price });
                }
                cart.bill += quantity*price;
                cart = await cart.save();
                return res.redirect('/cart');
            }
            else{
                // no cart exists, create one
                const newCart = await Cart.create({
                    userId,
                    items: [{ productId, name, image, quantity, price }],
                    bill: quantity*price
                });
                console.log('Added item to cart')
                return res.redirect('/cart');
            }
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }, 

    reduceQuantity: async (req, res) => {
        try {
            let userId = req.user.id
            let cart = await Cart.findOne({userId})
            let product = await Product.findOne({_id: req.params.id});
            const productId = req.params.id
            if(!product){
                return res.render('errors/404')
            } 
            const price = product.price;

            if(cart){
                // if cart exists for the user
                let itemIndex = cart.items.findIndex(p => p.productId == productId);
    
                // Check if product exists or not
                if(itemIndex > -1)
                {
                    let productItem = cart.items[itemIndex];
                    productItem.quantity -= 1;
                    cart.bill -= price;
                }
                else {
                    return res.render('errors/404')
                }
                
                cart = await cart.save();
                return res.redirect('/cart');
            }
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    },

    increaseQuantity: async (req, res) => {
        try {
            let userId = req.user.id
            let cart = await Cart.findOne({userId})
            let product = await Product.findOne({_id: req.params.id});
            const productId = req.params.id
            if(!product){
                return res.render('errors/404')
            } 
            const price = product.price;

            if(cart){
                // if cart exists for the user
                let itemIndex = cart.items.findIndex(p => p.productId == productId);
    
                // Check if product exists or not
                if(itemIndex > -1)
                {
                    let productItem = cart.items[itemIndex];
                    productItem.quantity += 1;
                    cart.bill += price;
                }
                else {
                    return res.render('errors/404')
                }
                
                cart = await cart.save();
                return res.redirect('/cart');
            }
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }
}