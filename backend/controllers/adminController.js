const validator = require('validator')
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt')
const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken')
const Appointment = require('../models/Appointment')
const User = require('../models/User')

//for adding doc
module.exports.addDoctor = async (req,res) => {
    try{

        let {name,email,password,experience,degree,speciality,about,fees,address} = req.body
       
        

        const image = req.file
  
        
        

        if(!name || !email || !password || !experience || !degree || !speciality || !about || !fees || !address || !image){
            return res.status(400).json({success:false,message:'All fields are required'})
        }
       
        
        //validating email format
        if(validator.isEmail(email) === false){//if email is invalid
            return res.status(400).json({success:false,message:'Please enter valid format of email'})
        }
       
        
        
        if(password.length < 8){
            return res.status(400).json({success:false,message:'Password must be atleast 8 characters long'})
        }
      
        
        //hashing password
        let salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password,salt)
      

        //upload image to cloudinary
        // const imageUpload = await cloudinary.uploader.upload(req.file.path,{resource_type:'image'})
        const imageUrl = image.path;
        const doctor = new Doctor({
            name,
            email,
            password:hashedPassword,
            degree,
            speciality,
            experience,
            about,
            fees,
            available:true,
            address : JSON.parse(address),
            image:imageUrl,
            date:Date.now()
        })

        await doctor.save()
        
        res.status(201).json({success:true,message:'Doctor added successfully'})
        

    }
    catch(err){
        
        res.status(500).json({success:false,message:'error from adminController'})
        
    }
}

module.exports.loginAdmin = async (req,res) => {
    try {
        let {email,password} = req.body
      
        
        if(!email || !password){
            return res.status(400).json({success:false,message:'All fields are required'})
        }

        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            const atoken = jwt.sign(email+password,process.env.JWT_SECRET)//jwt.sign() → creates a secure token containing your payload (like user ID or email).

            // You send this token to the client (frontend).
            
            // The client stores it and sends it with future requests (usually in the Authorization header).
            
            // The backend verifies the token using jwt.verify() and authenticates the user.
            
            
            return res.json({success:true,atoken})
        }
        else{
            return res.json({success:false,message:'Invalid credentials'})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

module.exports.allDoctors = async (req,res) => {
    try {
        let doctors = await Doctor.find({}).select('-password')
        if(doctors){
            return  res.json({success:true,doctors:doctors})
        }
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


//to get all appointments
module.exports.appointmentsAdmin = async(req,res) => {
    try {
        let appointments = await Appointment.find({})
        
        
        return res.json({success:true,appointments})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//to cancel appointment by admin
module.exports.appointmentCancelByAdmin = async (req,res) => {
    // try {
    //     let {id,appointmentId} = req.body
        
    //     const appointmentData = await Appointment.findById(appointmentId)
    //     if(appointmentData.userId !== id) return res.json({success:false,message:'Unauthorized action'})

    //     //now the user is authorized to cacel appointment so mark appointment cancel
    //     await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})

    //     //now appointment canel thai gai to booked slots mathi time slot pan remove karvo padse jethi te time slot free thai jay bija patients mate

    //     const {doctorId,slotDate,slotTime} = appointmentData
    //     const doctorData = await Doctor.findById(doctorId)

    //     doctorData.slotsBooked[slotDate] = doctorData.slotsBooked[slotDate].filter(SlotTime => SlotTime != slotTime)
    //     await doctorData.save()
    //     return res.json({success:true,message:'Appointment cancelled'})
    // } catch (error) {
    //     return res.json({success:false,message:error.message})
    // }

    try {

        const { appointmentId } = req.body
        const appointmentData = await Appointment.findById(appointmentId)

       

        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot 
        const { doctorId, slotDate, slotTime } = appointmentData

        const doctorData = await Doctor.findById(doctorId)

        let slotsBooked = doctorData.slotsBooked

        slotsBooked[slotDate] = slotsBooked[slotDate].filter(e => e !== slotTime)

        await Doctor.findByIdAndUpdate(doctorId, { slotsBooked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//to fetch info for admin dashboard
module.exports.adminDashboard = async(req,res) => {
    try {

        let doctors = await Doctor.find({})
        let appointments = await Appointment.find({})
        let users = await User.find({})

        const dashData = {
            doctors:doctors.length,
            patients:users.length,
            appointments:appointments.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        return res.json({success:true,dashData})
        
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}