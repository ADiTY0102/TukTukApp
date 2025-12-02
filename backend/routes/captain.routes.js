const express = require('express');
const router = express.Router();
const{ body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');
  
//Captain Register Route
router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name should be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password should be at least 8 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color should be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be at least 3 characters long'),
    body('vehicle.capacity').isNumeric({min:1}).withMessage('Capacity should be a number'),
    body('vehicle.vehicleType').isIn(['auto','motorcycle','car']).withMessage('Invalid vehicle type')
],
captainController.registerCaptain
);

//Captain Login Route
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password should be at least 6 characters long'),
],
    captainController.loginCaptain
);

//Captain Profile Route
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

//Captain logout Route
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router;