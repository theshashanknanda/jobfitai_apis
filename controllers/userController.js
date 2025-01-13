const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

exports.getUser = async (req, res) => {
    try{
        let user = await User.findOne({_id: req.user.id})

        return res
        .status(200)
        .json({
            success: true,
            message: "User data successfully fetched",
            data: user,
        })
    }catch(error){
        return res
            .status(500)
            .json({
                success: false,
                message: `Something went wrong: ${error.message}`,
        })
    }
}