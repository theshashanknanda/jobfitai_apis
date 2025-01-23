const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        maxLength: 1000,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    }
})

fileSchema.post("save", async (doc) => {
    try{
        // send confirmation email to user
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        let info = transporter.sendMail({
            from: 'JobfitAI Team',
            to: doc.email,
            subject: 'New File Upload to JobfitAI',
            html: `Hello, 
            <br><br>Your resume has been uploaded to JobFitAI. <br>
            <a href="${doc.url}">${doc.url}</a>
            <br><br>
            Regards,<br>
            JobFitAI Team`,
        })

        console.log(info)
    }catch(error){
        console.log(`Error sending confirmation email to the user: ${error.message}`)
    }
})

module.exports = mongoose.model("file", fileSchema)
