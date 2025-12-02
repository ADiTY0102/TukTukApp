const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

//Register Controller
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const isUserAlredayExists = await userModel.findOne({ email });
  if(isUserAlredayExists){
    return res.status(400).json({message:'User already exists'});
  }


  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });

  const token = await user.generateAuthToken();
  res.status(201).json({ token, user });
};


//Login Controller
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');
  if(!user){
    return res.status(401).json({message:'Invalid Email or password'});
  }

  const isMatch = await user.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message:'Invalid Email or password'});
  }
  const token = await user.generateAuthToken();
  res.cookie('token',token,{
    httpOnly:true,
  })
  res.status(200).json({token,user});

};


//User Profile Controller

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user });
}


module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization;  
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: 'Logged out successfully' });
}