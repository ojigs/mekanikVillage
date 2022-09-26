const Seller = require('../models/Seller')
const Product = require('../models/Product')
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getStore: async (req, res) => {
        try {
            const products = await Product.find({ seller: req.user.id })
            res.render('store', { store: req.user, products: products })
        } catch (error) {
            console.log(error)
        }
    },

    listProducts: (req, res) => {
        res.render('list')
    }, 

    createProduct: async (req, res) => {
        try {
            // Upload image to cloudinary
            console.log('are you here?')
            console.log(req.file)
            const result = await cloudinary.uploader.upload(req.file.path);

            await Product.create({
                name: req.body.productName,
                model: req.body.model,
                categories: req.body.categories,
                price: req.body.price,
                description: req.body.description,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                seller: req.user.id,
            });
            console.log("Product has been added!");
            res.redirect("/store");
        } catch (err) {
            console.log('or here')
            console.log(err);
        }
    }
}