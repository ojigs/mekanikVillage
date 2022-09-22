const express = require('express')
const app = express()
const logger = require('morgan')
const connectDB = require('./config/database')
const cors = require('cors')

//Use .env file in config folder
require('dotenv').config({ path: "./config/.env"})

//Connect to database
connectDB()

//logging
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(process.env.PORT, () => {
    console.log('Server is running, betta go catch it!')
})