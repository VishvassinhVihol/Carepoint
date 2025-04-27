const express = require('express')
const doctorRouter = express.Router()
const doctorController = require('../controllers/doctorController')
const getDoctorId = require('../middlewares/authDoctor')

doctorRouter.get('/list',doctorController.doctorList)
doctorRouter.post('/login',doctorController.doctorLogin)
doctorRouter.get('/appointments',getDoctorId,doctorController.getappointments)
doctorRouter.post('/complete-appointment',getDoctorId,doctorController.completeAppointment)
doctorRouter.post('/cancel-appointment',getDoctorId,doctorController.cancelAppointment)
doctorRouter.get('/dashboard',getDoctorId,doctorController.dashboardData)
doctorRouter.get('/profile',getDoctorId,doctorController.doctorProfile)
doctorRouter.post('/update-profile',getDoctorId,doctorController.updateDoctorProfile)

module.exports = doctorRouter