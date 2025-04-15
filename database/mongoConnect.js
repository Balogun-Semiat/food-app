const dotenv = require("dotenv")
dotenv.config();
const mongoose = require("mongoose");
const {MONGO_URI} = require("../constants/index");


const connectToDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Connected to DB")
    } catch (error){
        throw error
    }
}

module.exports = connectToDB