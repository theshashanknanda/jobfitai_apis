let express = require('express')
let app = express()
app.use(express.json())

require('dotenv').config()

let database = require('./config/connection')
database()

let authRouter = require('./routes/authenticationRoutes')
app.use("/api/v1", authRouter)

let userRouter = require('./routes/userRoutes')
app.use("/api/v1", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`listening at ${process.env.PORT}`)
})

app.get('/', (req,res) => {
    return res.send('hello!')
})