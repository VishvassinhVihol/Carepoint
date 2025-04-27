const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')
const getUserId = require('../middlewares/authUser')
const {storage} = require('../config/cloudinary');
const multer = require('multer');

const upload = multer({  storage });


userRouter.post('/register',userController.registerUser)
userRouter.post('/login',userController.userLogin)
userRouter.get('/get-profile',getUserId,userController.getUserDetails)//Yes — that was exactly the issue! When using multer, especially with upload.single('image'), it parses the incoming multipart/form-data request before any middleware gets to touch req.body. So if you had your getUserId middleware before upload.single(...), anything you added to req.body (like id) would get overwritten.
userRouter.post('/update-profile',upload.single('image'),getUserId,userController.updateProfile)
userRouter.post('/book-appointment',getUserId,userController.bookAppointment)
userRouter.get('/appointments',getUserId,userController.appointmentsBooked)
userRouter.post('/cancel-appointment',getUserId,userController.cancelAppointment)
userRouter.post('/payment-razorpay',getUserId,userController.paymentRazorPay)
userRouter.post('/verify-payment',getUserId,userController.verifyPayment)

module.exports = userRouter