const mailer = require("nodemailer")

require("dotenv").config()

const mailSend = async(to,subject,text)=>{
        const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    }) 

    const mailOptions = {
        to:to,
        subject:subject,
        // text:text <-- use for plain text
        html:text              // <-- we can use html here for designed mail
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
}

module.exports = mailSend