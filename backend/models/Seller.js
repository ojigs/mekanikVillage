const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    shopName: {
        type: String,
        unique: true,
    },

    sellerName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
    },

    password: String,

})

//Password hash with bcrypt middleware
SellerSchema.pre("save", function save(next) {
    const seller = this;
    if (!seller.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(seller.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            seller.password = hash;
            next();
        });
    });
});

// Helper method for validating user's password.

SellerSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

module.exports = mongoose.model('Seller', SellerSchema)
