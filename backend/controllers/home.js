const Product = require('../models/Product')

module.exports = {
    getIndex: async (req, res) => {
        try {
            const lubrication = await Product.find({ categories: 'Lubrication' }).sort({ createdAt: "desc" }).lean()
            const interior = await Product.find({ categories: 'Interior' }).sort({ createdAt: "desc" }).lean()
            const exterior = await Product.find({ categories: 'Exterior' }).sort({ createdAt: "desc" }).lean()
            const lighting = await Product.find({ categories: 'Lighting' }).sort({ createdAt: "desc" }).lean()
            const wheel = await Product.find({ categories: 'Wheels & Tyres' }).sort({ createdAt: "desc" }).lean()
            const bodies = await Product.find({ categories: 'Body' }).sort({ createdAt: "desc" }).lean()
            res.render('index', {
                lubrication: lubrication,
                interior: interior,
                exterior: exterior,
                lighting: lighting,
                wheel: wheel,
                bodies: bodies
            })
        } catch (error) {
            console.log(error)
        }
    }
}