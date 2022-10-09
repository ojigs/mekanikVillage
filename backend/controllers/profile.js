const User = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
	        res.render('profile', { user: req.user })
        } catch (error) {
            console.log(error)
            res.render('errors/500')
        }
    }, 
}