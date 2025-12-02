const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const connectToDB = require('./db/db');
connectToDB();


const userRoutes = require('./routes/user.route');
const captainRoutes = require('./routes/captain.routes');



//use-parts

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use (cookieParser());


//all-routes

app.get('/',(req,res)=>{
    res.send("This side tuktukkk app...!!")
});

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);




module.exports = app;