const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const methodOverride = require('method-override')
const flash = require('express-flash')

const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const storeRoutes = require('./routes/store')
const productRoutes = require('./routes/products')
const profileRoutes = require('./routes/profile')
const cartRoutes = require('./routes/cart')


//Use .env file in config folder
require('dotenv').config({ path: "./config/.env"})

//Passport config
require('./config/passport')(passport)

//Connect to database
connectDB()

//logging
app.use(logger('dev'))

app.use(cors())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Use forms for put / delete
app.use(methodOverride("_method"));

//Setup session stored in MongoDB. Flash uses session
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ client: mongoose.connection.getClient() })
    })
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, etc
app.use(flash())

app.use('/', mainRoutes)
app.use('/store', storeRoutes)
app.use('/product', productRoutes)
app.use('/profile', profileRoutes)
app.use('/cart', cartRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is running, betta go catch it!')
})