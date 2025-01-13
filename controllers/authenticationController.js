const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

exports.signup = async (req,res) => {
    try{
        // get the data
        const {name, email, password} = req.body;

        // check if user already exists
        let existingUser = await User.findOne({email: email})

        if(existingUser){
            return res
            .status(400)
            .json({
                success: false,
                message: "User already exists",
            })
        }

        // create hash
        try{
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);

            // create user entry
            const user = await User.create({
                name,
                email,
                password: hash,
            })

            return res
            .status(200)
            .json({
                success: true,
                message: "User created successfully",
                user: user,
            })
        }catch(error){
            return res
            .status(500)
            .json({
                success: false,
                message: `An error occured while creating hash: ${error}`,
            })
        }

    }catch(error){
        return res
            .status(500)
            .json({
                success: false,
                message: `An error occured: ${error.message}`,
            })
    }
}

exports.login = async (req,res) => {
    // get the data
    const {email, password} = req.body;

    try{
        // check if not registered
        let user = await User.findOne({email: email})
        if(!user){
            return res
            .status(404)
            .json({
                success: false,
                message: "User not registered",
            })
        }

        // check if values are correct
        if(await bcrypt.compare(password, user.password)){
            // password matches
            // sign a jwt token
            let payload = {
                id: user._id,
                email: email,
                password: password,
            }

            let token = jwt.sign(
                payload,
                process.env.JWT_SECRET, 
                {
                    expiresIn: "2h",
                }
            )

            // return success with jwt token
            return res
            .status(200)
            .json({
                success: true,
                message: "Logged in sucessfully",
                token: token,
            })

        }else{
            // password does not match
            return res
            .status(401)
            .json({
                success: false,
                message: "Password doesnt match",
            })
        }
    }catch(error){
        return res
            .status(500)
            .json({
                success: false,
                message: `Something went wrong: ${error.message}`,
        })
    }
}