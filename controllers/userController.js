const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const {createToken, verifyToken} = require('../services/sessionService');
const {sendEmail} = require("../utils/sendEmail")
const {generateVerificationEmail, generateResetMail} = require("../utils/emailTemplate");
const {JWT_SECRET} = require('../constants/index');
const jwt = require('jsonwebtoken')


const createUser = async(req, res)=>{
    const {firstName, lastName, email, password, role} = req.body;

    try {
        if(!firstName || !lastName ||!email ||!password ||!role){
            return res.status(400).send({message: "All fileds are required"})
        }

        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(200).send({message: "This email has been registered"})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        console.log("newUser", newUser);

        const token = createToken(newUser.email)
        console.log(token)

        const emailContent = generateVerificationEmail(token)

        if(newUser){
            await sendEmail(newUser.email, "VERIFICATION MAIL", emailContent)
        }
        return res.status(200).send({message: "User added successfully", newUser})

    } catch (error) {
        console.log(error)
    }
}

const verifyEmailToken = async(req, res)=>{
    try{
        const {token} = req.query;
        console.log("Received Token:", req.query.token);

        if(!token){
            return res.status(400).send({message: "No token provided"})
        }
        // const verify = jwt.verify(token, JWT_SECRET);
        const verify = verifyToken(token);
        console.log("verify", verify);

        if(!verify){ 
            res.status(400).json({message:"Invalid or expired token"})
        }
        
        const user = await User.findOne({email: verify.email})
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        user.isVerified = true;
        await user.save();
        console.log(user)
        return res.status(200).send({message: "Email verified successfully! You can now log in"})
    } catch(error){
        console.error("Error verifying user");
        return res.status(500).send({message: "Error verifying user"})
    }
}

const logIn = async(req, res)=>{
    const {email, password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).send({message: "All fields are required"})
        }
    
        const checkUser = await User.findOne({email})
        if(!email){
            return res.status(401).send({message: "User not found! Please register"})
        }

        if(checkUser.isVerified === false){
            const emailContent = generateVerificationEmail(token)
            await sendEmail(newUser.email, "VERIFICATION MAIL", emailContent)
            
            return res.status(403).send({message: "Email not verified. Please check your email and verify it"})
        }
    
        const verifyPassword = await bcrypt.compare(password, checkUser.password);
    
        if(!verifyPassword){
            return res.status(401).send({message: "Incorrect Password"})
        }
    
        const token = createToken(email);
        if(!token){
            res.status(401).send({message: "No token provided"})
        }
        
        return res.status(200).send({message: "Login Successful", checkUser, token})
    } catch(error){
        console.log(error);
    }
}

const requestPasswordReset = async(req, res) =>{
    const {email} = req.body;

    try{
        if(!email){
            return res.status(400).send({message: "Enter your email"})
        }
    
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).send({message: "Email does not exist"})
        }

        const token = createToken(email);
        console.log(token, "request")

        if(!token){
            res.status(401).send({message: "No token provided"})
        }

        const emailContent = generateResetMail(token);

        const sendMail = sendEmail(user.email, "RESET PASSWORD", emailContent);

        return res.status(200).send({message: "Reset link has been sent to your email"})


    } catch(error){
        console.log(error);
    }
}

const resetPassword = async(req, res)=>{
    const { token } = req.query;
    console.log('reset-token',req.query.token, "ttt")
    const {newPassword} = req.body;

    try{
        if(!token){
            return res.status(400).send({message: "Token not provided"})
        }

        if(!newPassword){
            return res.status(400).send({message: "Enter new password"})
        }
        
        const verify = verifyToken(token);
    

        if(!verify){ 
            res.status(400).json({message:"Invalid or expired token"})
        }

        const user = await User.findOne({email: verify.email})
  
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = newPassword;
        await user.save();
        return res.status(200).send({message: "Password has been updated"})
    } catch(error){
        console.log(error)
    }
}

const getUser = async(req, res)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user){
        return res.status(200).send({message: "User not found"})
    }

    return res.status(200).send({message: "User found", user})
}

const getAllUsers = async(req, res) =>{
    const users = await User.find({});
    if(!users){
        return res.status(200).send({message: "No users found"})
    }
    return res.status(200).send({message: "Users found", users})
}

const updateUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const updateUser = await User.findByIdAndUpdate(id, {...req.body});
        if(!updateUser) return res.status(500).send({message: "User not found"})
        res.status(200).send({message:"user updated", updateUser})
    } catch (error) {
        console.log("failed to update user", error)
        return res.status(500).send({message: "failed to update user"})
    }
}

const deleteUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser) return res.status(400).send({message: "User nt found"})
        return res.status(200).send({message: "User has been deleted"})
    } catch (error) {
        console.error("failed to delete user", error);
        return res.status(500).send({message: "failed to delete user"})
    }
}



module.exports = {
    createUser,
    verifyEmailToken,
    logIn,
    requestPasswordReset,
    resetPassword,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}