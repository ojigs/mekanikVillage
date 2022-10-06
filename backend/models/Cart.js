const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1'],
        default: 1
    },

    bill: {
        type: Number,
        required: true,
        default: 0,
    }
})

module.exports = mongoose.model('Cart', CartSchema)