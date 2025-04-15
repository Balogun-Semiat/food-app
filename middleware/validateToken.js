const verifyToken = require('../services/sessionService')
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../constants/index")

const validateToken = (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).send({message: "No token provided"})
        }
        console.log(token)
        // const validToken = verifyToken(token);
        const validToken = jwt.verify(token, JWT_SECRET);
        if(!validToken){
            return res.status(401).send({message: "Invalid token"})
        }
        req.user = validToken;   
        next()
    }
    catch(error){
        console.log(error);
        return res.status(401).send({message: "Invalid token"})
    }
}

module.exports = validateToken;