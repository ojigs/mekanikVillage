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
            res.render('errors/500')
        }
    },

    listProducts: (req, res) => {
        try {
            res.render('list')
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }, 

    createProduct: async (req, res) => {
        try {
            // Upload image to cloudinary
            console.log('are you here?')
            const result = await cloudinary.uploader.upload(req.file.path, 
                { eager: [
                    { fetch_format: "webp", flags: "awebp", format: "" },
                    { fetch_format: "jp2", format: "" },
                    { fetch_format: "avif", format: "" },],
                  eager_async: true, });
            console.log(result)

            await Product.create({
                name: req.body.productName,
                model: req.body.model,
                categories: req.body.categories,
                price: req.body.price,
                description: req.body.description,
                image: result.eager[0].secure_url,
                cloudinaryId: result.public_id,
                seller: req.user.id,
            });
            console.log("Product has been added!");
            res.redirect("/store");
        } catch (err) {
            console.log(err);
            res.render('errors/500')
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById({ _id: req.params.id })
            await cloudinary.uploader.destroy(product.cloudinaryId)
            await Product.deleteOne({ _id: req.params.id })
            console.log('deleted product')
            res.redirect('/store')
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    },

    //get product to update
    getProduct: async (req, res) => {
        try {
            const product = await Product.findOne({ _id: req.params.id })
            res.render('edit', { product })  
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    },

    //update product
    updateProduct: async (req, res) => {
        try {
            let product = await Product.findById(req.params.id).lean()
            await cloudinary.uploader.destroy(product.cloudinaryId);
            const result = await cloudinary.uploader.upload(req.file.path);
            await Product.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    name: req.body.productName,
                    model: req.body.model,
                    categories: req.body.categories,
                    price: req.body.price,
                    description: req.body.description,
                    image: result.secure_url,
                    cloudinaryId: result.public_id,
                    seller: req.user.id,
                }
            })
            res.redirect('/store')
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }
}