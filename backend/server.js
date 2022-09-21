const express = require('express')
const app = express()
const logger = require('morgan')
const connectDB = require('./config/database')

//Use .env file in config folder
require('dotenv').config({ path: "./config/.env"})

//Connect to database
connectDB()

//logging
app.use(logger('dev'))

app.listen(process.env.PORT, () => {
    console.log('Server is running, betta go catch it!')
})