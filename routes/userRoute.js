const {Router} = require("express")
const userRoute = Router();
const {
    createUser, 
    logIn, 
    verifyEmailToken, 
    requestPasswordReset, 
    resetPassword, 
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const validateToken = require("../middleware/validateToken");

userRoute.post('/create-user', createUser)
userRoute.get('/verify-email', verifyEmailToken)
userRoute.post('/sign-in', logIn)
userRoute.post('/reset-mail', requestPasswordReset)
userRoute.patch('/reset-pass', resetPassword)
userRoute.get('/user/:id', getUser)
userRoute.get('/users', getAllUsers)
userRoute.patch('/edit/:id', updateUser)
userRoute.delete('/delete/:id', deleteUser)



module.exports = userRoute;