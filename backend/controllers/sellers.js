const User = require('../models/User')

module.exports = {
    createAccount: async (req, res) => {
        const result = await cloudinary.uploader.upload(req.file.path);

        await Seller.create({
            shopName,
            sellerName,
            email,
            password,
            
        })
    }
}