const nodemailer = require("nodemailer");
require("dotenv").config();
const {EMAIL} = require('../constants/index')
const {MAIL_PASSWORD} = require('../constants/index')
// const emailContent = require('../utils/emailTemplate')

const sendEmail = async(email, subject, html)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: MAIL_PASSWORD
        }
    })
 
    await transporter.sendMail({
        from: `Belle Full ${EMAIL}`,
        to: email,
        subject: subject,
        html: html
    })
}

module.exports = {sendEmail}