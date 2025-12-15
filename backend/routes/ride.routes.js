const express = require('express');
const router  = express.Router();
const {body} = require('express-validator');

router.post('/create',
    body('userId').isString().isLemgth({min:24,max:24}).withMessage('Invalid user ID'),
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup location'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination'),
)

module.exports = router;