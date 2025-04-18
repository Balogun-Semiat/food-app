const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../constants/index')

const createToken = (email) => {
    try{
        const token = jwt.sign({email}, JWT_SECRET, {expiresIn: '1h'});
        return token
    } catch(error){
        throw error
    }
}

const verifyToken = (token) => {
    try{
        const verify = jwt.verify(token, JWT_SECRET);
        return verify
    } catch(error){
        throw error
    }
}


module.exports = { createToken, verifyToken }