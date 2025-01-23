let express = require('express')
let mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

exports.setDisabilityController = async (req,res) => {
    // get email & disability to set
    let {email, disability} = req.body;

    const updatedUser = await User.findOneAndUpdate(
        {"email": email},
        {$set: {"mappedDisability": disability}},
        {new: true, runValidators: true}
    )

    if(!updatedUser){
        return res
        .status(500)
        .json({
            success: false,
            message: "Something went wrong, disability not set",
        })
    }

    return res
    .status(200)
    .json({
        success: true,
        message: "User disability set",
        data: updatedUser,
    })
}
