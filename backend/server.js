const express = require('express')
const app = express()
const logger = require('morgan')
const connectDB = require('./config/database')
const cors = require('cors')

const mainRoutes = require('./routes/main')

//Use .env file in config folder
require('dotenv').config({ path: "./config/.env"})

//Connect to database
connectDB()

//logging
app.use(logger('dev'))
app.use(cors())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', mainRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is running, betta go catch it!')
})