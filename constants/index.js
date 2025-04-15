const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET
const EMAIL = process.env.EMAIL
const MAIL_PASSWORD = process.env.MAIL_PASSWORD


module.exports = {
    JWT_SECRET,
    MONGO_URI,
    EMAIL,
    MAIL_PASSWORD
}