// init app
let express = require('express')
let app = express()

// config dotenv
require('dotenv').config()

// setup json middleware
app.use(express.json())

// setup file upload middleware
let fileuploadmiddleware = require('express-fileupload')
app.use(fileuploadmiddleware({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}))

// config database
let database = require('./config/connection')
database()

// config cloudinary
let cloudinary = require('./config/cloudinary')
cloudinary()

let authRouter = require('./routes/authenticationRoutes')
app.use("/api/v1", authRouter)

let userRouter = require('./routes/userRoutes')
app.use("/api/v1", userRouter)

let fileUploadRouter = require('./routes/fileUploadRoutes')
app.use("/api/v1", fileUploadRouter)

app.listen(process.env.PORT, () => {
    console.log(`listening at ${process.env.PORT}`)
})
