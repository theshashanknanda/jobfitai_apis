let mongoose = require('mongoose')
require('dotenv').config()

let connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
    )
    .then(() => {
        console.log('Database connection successfull')
    })
    .catch((error) => {
        console.log('something went wrong: ' + error.message)
    })
}

module.exports = connect;