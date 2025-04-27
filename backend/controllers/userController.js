const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { cloudinary } = require('../config/cloudinary')
const Doctor = require('../models/Doctor')
const Appointment = require('../models/Appointment')
const razorpay = require('razorpay')

//to register user
module.exports.registerUser = async (req,res) => {
    try{
        const {name,email,password} = req.body

        if(!name || !email || !password) return res.json({success:false,message:"Missing Details"})
        
        if(password.length < 8) return res.json({success:false,message:"Password must be of atleast 8 chars"})
        
        //validate email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email"})
        }

        //now we have to encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = new User({
            name,
            email,
            password:hashedPassword
        })
        await userData.save()

        //now genreate token
        const token = jwt.sign({id:userData._id},process.env.JWT_SECRET)

        return res.json({success:true,token})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}


module.exports.userLogin = async (req,res) => {
    try {
        let {password,email} = req.body

        const user = await User.findOne({email:email})

        if(!user) return res.json({success:false,message:'User does not exist!'})
        
        //now match password
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            //crate token and send it so that user can login
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token})

        }
        else return res.json({success:false,message:'incorrect Password!'})
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

module.exports.getUserDetails = async (req,res) => {
    try {
        let {id} = req.body
        let user = await User.findById(id).select('-password')

        if(user){
            
            return res.json({success:true,user})
            
        }
        else return res.json({success:false,message:"User not found"})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }

}

module.exports.updateProfile = async (req,res) => {
    try {
        let {id,name,email,phone,address,gender,dob} = req.body
        let imageFile = req.file
  
        
        if(!name || !email || !phone || !dob){
            return res.json({success:false,message:"Data Missing"})
        }
        
        await User.findByIdAndUpdate(id,{name,email,phone,address:JSON.parse(address),gender,dob})

        if(imageFile){
            //upload image in cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            let imageUrl = imageUpload.secure_url

            await User.findByIdAndUpdate(id,{image:imageUrl})
        }
        const user = await User.findById(id)
   
        
        res.json({success:true,message:"Profile Updated!"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//controller to book appointment 
module.exports.bookAppointment = async (req,res) => {
    try {
        
        const {id,docId,slotDate,slotTime} = req.body
        const docData = await Doctor.findById(docId)
       

        if(!docData.available){
            return res.json({success:false,message:"Doctor not available!"})
        }

        //now aapde check karvu padse ke aa slot already book chhe ke NlaBPu8HuXdaYLcI9iTOc1IrQCEtnxVaVgb5QQV2TO9cu1M8K8xdHRVqN58
        let slots_booked = docData.slotsBooked

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                //means slot is already booked 
                return res.json({success:false,message:'Slot is booked!'})
            }
            else{
                //slot is available
                slots_booked[slotDate].push(slotTime)
            }
        }
        else{
            //aa date no slot j nathi to create karo 
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(id).select('-password')

        //now je old slots hata temne delete kari do to update it with new slots
        // delete docData.slotsBooked


        const newAppointment = new Appointment({
            userId:id,
            doctorId:docId,
            userData,
            doctorData:docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()

        })

        await newAppointment.save()

        //insert new slots in doctor
        await Doctor.findByIdAndUpdate(docId,{slotsBooked:slots_booked})

        return res.json({success:true,message:'Appointment Booked'})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//controller of appointments booked by user
module.exports.appointmentsBooked = async (req,res,next) => {
   try{
   
    
    let {id} = req.body
    let appointments = await Appointment.find({userId:id})

    return res.json({success:true,appointments})
   }
    catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//controller to cancel booked appointment
module.exports.cancelAppointment = async (req,res) => {
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

        const { id, appointmentId } = req.body
        const appointmentData = await Appointment.findById(appointmentId)

        // verify appointment user 
        if (appointmentData.userId !== id) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

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

//controller for payment using razorpay
const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})



module.exports.paymentRazorPay = async (req,res) => {
    try {
        const {appointmentId} = req.body

        const appointmentData = await Appointment.findById(appointmentId)

        //jo appointmentData na hoy or appointment cancel thai gai hoy to return kari do
        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:false,message:"Appointment cancelled or not found!"})
        }

        //creating options
        const options = {
            amount: appointmentData.amount * 100,
            currency:process.env.CURRENCY,
            receipt:appointmentId
        }

        const order = await razorpayInstance.orders.create(options)
        return res.json({success:true,order})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//controller to verify payment
module.exports.verifyPayment = async (req,res) => {
    try {
        const {razorpay_order_id} = req.body
        
        
        if (!razorpay_order_id) {
            return res.status(400).json({ success: false, message: "razorpay_order_id is required" });
        }
        
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)


        if(orderInfo.status == 'paid'){
            //now in this orderInfo we store appointmentId in order.receipt to now payment thai gayu chhe to aapde appointment ma payment ne true karvu padse
            await Appointment.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            return res.json({success:true,message:'Payment Successful!'})
        }
        else res.json({success:true,message:'Payment Failed!'})
        
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}