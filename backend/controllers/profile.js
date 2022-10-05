const User = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const user = await User.findOne({id: req.user.id})
	        res.render('profile', { user: user })
            console.log(req.usedStrategy)
        } catch (error) {
            console.log(error)
        }
    }, 
}