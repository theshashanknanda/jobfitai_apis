const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next) => {
    try{
    // get the token
    const token = req.header("Authorization").replace("Bearer ", "")
        
    if(!token){
        return res
        .status(401)
        .json({
            sucess: false,
            message: "token not provided",
        })
    }

    // verify token
    try{
        // set payload user id to request for next handler
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;

        // execute next handler
        next()
    }catch(error){
        return res
        .status(401)
        .json({
            success: false,
            message: "Invalid token",
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