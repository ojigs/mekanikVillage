const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');

module.exports = {
    getOrder: async (req, res) => {
        // let userId = req.user.id
        // const order = await Order.findOne({userId}).sort({date: -1})
        // res.render('order', { order: order })
        let key = process.env.STRIPE_PUBLISHABLE_KEY
        res.render('checkout', { key: key })
    },

    checkout: async (req, res) => {
        try{
            const userId = req.user.id;
            const {source} = req.body;
            let cart = await Cart.findOne({userId});
            let user = await User.findOne({_id: userId});
            const email = req.user.email;
            if(cart){
                const charge = await stripe.charges.create({
                    amount: cart.bill,
                    currency: 'inr',
                    source: source,
                    receipt_email: email
                })
                if(!charge) throw Error('Payment failed');
                if(charge){
                    const order = await Order.create({
                        userId,
                        items: cart.items,
                        bill: cart.bill
                    });
                    const data = await Cart.findByIdAndDelete({_id:cart.id});
                    return res.redirect('/order');
                }
            }
            else{
                res.status(500).send("You do not have items in cart");
            }
        }
        catch(err){
            console.log(err);
            res.render('errors/500')
        }
    }
}