const express = require('express')
require("dotenv").config()
// const express = require('express-fileupload')

const { connectDB } = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const fileUpload = require('express-fileupload')

connectDB()

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/users', require('./routes/userRoutes'))
app.use('/assets', require('./routes/assetRoutes'))
app.use('/temp_uploads', express.static(__dirname + '/temp_uploads'))
app.use('/accomodations', require('./routes/accomodationRoutes'))

// Override default error handler
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})