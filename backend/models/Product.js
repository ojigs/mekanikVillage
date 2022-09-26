const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    model: {
        type: String,
    },

    categories: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    cloudinaryId: {
        type: String,
        require: true,
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Product', ProductSchema)