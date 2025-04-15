const express = require("express");
const app = express();
const connectToDB = require("./database/mongoConnect");
const userRoute = require("./routes/userRoute");
const foodRoute = require("./routes/foodRoute");

const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors({origin: '*'}));
app.use(express.json({extended: "true", limit: "200mb"}));
app.use(express.urlencoded({extended: "true", limit: "200mb"}));
app.use(userRoute);
app.use(foodRoute);




const server = app.listen(5000, async()=>{
    try{
        await connectToDB()
        console.log("Connected to MongoDB")
    } catch(error){
        console.log(error)
    }
})