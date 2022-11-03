const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    items : [
        {
            productId: {
                type: String
            },

            name: String,

            image: String,

            quantity: {
                type: Number,
                require: true,
                min: [1],
                default: 1
            },

            price: Number,

            date: {
                type: Date,
                default: Date.now
            }

        }
    ],

    bill: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Order', OrderSchema)