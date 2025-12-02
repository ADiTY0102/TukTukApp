const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const captainSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type:String,
            required:true,
            minlength: [3,'First name at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength: [3,'Last name at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Invalid Email'],
        minlength:[5,'Email must be at least 5 characters'],
    },
    password:{
        type:String,
        required:true,
        minlength: [8, 'Password should be at least 8 characters'],
        select:false,
    },
    socketID:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength: [3,'color should be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength: [3,'number plate should be accurate'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1'],
        },
        vehicleType:{
            type:String,
            required: true,
            enum:['auto','motorcycle','car'],
        },
    },
    location:{
        latitude:{
            type:Number,
        },
        longitude:{
            type:Number,
        },
    },
})

captainSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

const captainModel = mongoose.model('captain',captainSchema);
module.exports = captainModel;