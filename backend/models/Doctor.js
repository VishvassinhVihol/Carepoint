const mongoose = require('mongoose')

const doctorShcema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    speciality:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    about:{type:String,required:true},
    fees:{type:Number,required:true},
    address:{type:Object,required:true},
    available:{type:Boolean,default:true},
    slotsBooked:{type:Object,default:{}},
    date:{type:Number,required:true},

})

const Doctor = mongoose.model('Doctor',doctorShcema)
module.exports = Doctor