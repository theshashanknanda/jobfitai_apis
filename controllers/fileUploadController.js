let cloudinary = require('cloudinary').v2
let mongoose = require('mongoose')
let User = require('../models/User')
let File = require('../models/File')
const { options } = require('../routes/fileUploadRoutes')
require('dotenv').config()

exports.uploadAndSavePdf = async (req,res) => {
    try{
        // retrieve file and info
        let {title, description} = req.body;
        let file = req.files.file;
        let extension = file.name.split('.')[1];

        let user = await User.findOne({_id: req.user.id})

        console.log(title)
        console.log(description)
        console.log(file, extension)
        console.log(user)

        // upload file to cloudinary
        if(extension !== "pdf"){
            return res
            .status(400)
            .json({
                success: false,
                message: "File format not supported",
            })
        }

        let options = {
            folder: "jobfit_resume_pdfs",
            quality: 90,
            resource_type: "auto",
            public_id: user.email,
        }
        const response = await cloudinary.uploader.upload(file.tempFilePath, options)
        console.log(response)

        // save entry to database
        const prevRecord = await File.findOne({userId: req.user.id})
        if(prevRecord){
            await File.deleteOne({ _id: prevRecord._id });
        }

        const uploadedFileRecord = await File.create({
            title: title,
            description: description,
            url: response.secure_url,
            userId: req.user.id,
            email: req.user.email,
        })
        console.log(uploadedFileRecord)

        // send an email confirmation of upload to the user

        return res
        .status(200)
        .json({
            success: true,
            message: "File uploaded successfully",
            file: uploadedFileRecord,
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