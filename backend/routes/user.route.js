const express = require('express');
const router = express.Router();
const{body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');



//Registration Route
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be at least 3 characters long'),
    body('password').isLength({min:8}).withMessage('Password should be at least 8 characters long'),   
],
userController.registerUser)




//Login Route
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password should be at least 6 characters long'),
],

userController.loginUser)

module.exports = router;

//User Profile Route
router.get('/profile',authMiddleware.authUser,userController.getUserProfile);

//LogOut user Route
router.get('/logout', authMiddleware.authUser, userController.logoutUser);