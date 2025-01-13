let mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model("user", userSchema)