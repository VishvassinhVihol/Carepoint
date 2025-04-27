const  Doctor = require('../models/Doctor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Appointment = require('../models/Appointment')
const User = require('../models/User')

// change availability of the doctor
module.exports.changeAvailability = async (req,res) => {
    //find doctor
    try {
        let {docId} = req.body
        
        
        let doctor = await Doctor.findById(docId)
       
        await Doctor.findByIdAndUpdate(docId,{available:!doctor.available})
        res.json({success:true,message:'Availability changed!'})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

module.exports.doctorList = async(req,res) => {
    try {
       let doctors = await Doctor.find({}).select(['-password','-email']) //password and email ne chhodine badho data molido
       return res.json({success:true,doctors})
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}

module.exports.doctorLogin = async (req,res) => {
   try {
    let {email,password} = req.body
    if(!email || !password) return res.json({status:false,message:'invalid credentials'})

    let doctor = await Doctor.findOne({email:email})
    if(!doctor) return res.json({status:false,message:'Doctor does not exist'})

    //now doctor exist kare chhe to have aapde password ne match karisu
    const isMatch = await bcrypt.compare(password,doctor.password)

    if(isMatch){
        //means doctor exist kare chhe to aapde token generate karisu and tene backend ma send karisu
        let dToken =  jwt.sign({id:doctor._id},process.env.JWT_SECRET)
        return res.json({success:true,dToken})

    }
    else  return res.json({success:false,message:'incorrect Password!'})

   } catch (error) {
    res.json({success:false,message:error.message})
   }

    
}

//controller to get appointments of a particular doctor
module.exports.getappointments = async (req,res) => {
   try {
    let {id} = req.body //this is doctor id

    let appointments = await Appointment.find({doctorId:id})
   
    
    return res.json({success:true,appointments})

   } catch (error) {
    return res.json({success:true,message:error.message})
   }

}

//to cancel appointment 
module.exports.cancelAppointment = async (req,res) => {
    try {
        let {appointmentId,id} = req.body //id is doctorId
       
        

        const appointmentData = await Appointment.findById(appointmentId)

        await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})

        //now aa slot ne free kari do doctor na slotsBooked mathi
        const {slotDate,slotTime} = appointmentData

        const doctorData = await Doctor.findById(id)

        let slotsBooked = doctorData.slotsBooked
        slotsBooked[slotDate] = slotsBooked[slotDate].filter(e => e !== slotTime)
        await Doctor.findByIdAndUpdate(appointmentData.doctorId, { slotsBooked })
        res.json({ success: true, message: 'Appointment Cancelled' })
        
    } catch (error) {
        return res.json({success:true,message:error.message})
    }
}

//api to mark appointment completed 
module.exports.completeAppointment = async (req,res) => {
    try {
        let {id,appointmentId} = req.body
        
        const appointmentData = await Appointment.findById(appointmentId)

        //verify that jena jode appointment book kari chhe te j loggedin chhe ne
        if(appointmentData && id == appointmentData.doctorId){
            
            await Appointment.findByIdAndUpdate(appointmentId,{isCompleted:true})

            const {slotDate,slotTime} = appointmentData

            const doctorData = await Doctor.findById(id)

            let slotsBooked = doctorData.slotsBooked
            slotsBooked[slotDate] = slotsBooked[slotDate].filter(e => e !== slotTime)
            await Doctor.findByIdAndUpdate(appointmentData.doctorId, { slotsBooked })
            res.json({ success: true, message: 'Appointment Completed' })
        }

    } catch (error) {
        return res.json({success:true,message:error.message})
    }
}

//for dashboard
module.exports.dashboardData = async (req,res) => {
    try {
        
        let {id} = req.body

        
        let appointments = await Appointment.find({doctorId:id})

        let earnings = 0;
        
        appointments.map((item) => {
            if(item.isCompleted || item.payment) earnings += item.amount
        })

        //count unique patients
        let patients = []

        appointments.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        let dashData = {
            earnings,
            appointments : appointments.length,
            patients : patients.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }
        return res.json({success:true,dashData})

    } catch (error) {
        return res.json({success:true,message:error.message})
    }
}

module.exports.doctorProfile = async (req,res) => {
    try {

        let {id} = req.body

        let doctor = await Doctor.findById(id).select('-password')

        return res.json({success:true,doctor})
        
    } catch (error) {
        return res.json({success:true,message:error.message})
    }
}

//to update doctorProfile
module.exports.updateDoctorProfile = async (req,res) => {
    try {

        let {id,fees,address,available} = req.body

        if(!fees  || !address){
            return res.json({success:false,message:"Data Missing"})
        }

        await Doctor.findByIdAndUpdate(id,{fees,address,available})

        return res.json({success:true,message:'Profile updated'})
        
    } catch (error) {
        return res.json({success:true,message:error.message})
    }
}