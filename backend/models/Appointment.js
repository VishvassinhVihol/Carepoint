const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    doctorId: {type:String,required:true},
    slotDate: {type:String,required:true},
    slotTime: {type:String,required:true},
    userData: {type:Object,required:true},
    doctorData: {type:Object,required:true},
    amount:{type:Number,required:true},
    date:{type:Number,required:true},
    cancelled:{type:Boolean,required:false},
    payment:{type:Boolean,required:false},
    isCompleted:{type:Boolean,required:false},
    

})

const Appointment = mongoose.model('Appointment',appointmentSchema)

module.exports = Appointment