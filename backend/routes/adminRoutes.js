const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
const doctorController = require('../controllers/doctorController')
const multer  = require('multer')//form na data ne parse karva.

const {storage} = require('../config/cloudinary');
const authAdmin = require('../middlewares/authAdmin');
const upload = multer({  storage });


// adminRouter.get('/add-doctor',(req,res,next) => {
//     res.render('admin/addDoc.ejs')
// })
adminRouter.post('/add-doctor',authAdmin,upload.single('image'), adminController.addDoctor);
adminRouter.post('/login',adminController.loginAdmin);
adminRouter.post('/allDoctors',authAdmin,adminController.allDoctors)
adminRouter.post('/change-availability',authAdmin,doctorController.changeAvailability)
adminRouter.get('/appointments',authAdmin,adminController.appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,adminController.appointmentCancelByAdmin)
adminRouter.get('/dashboard',authAdmin,adminController.adminDashboard)

module.exports = adminRouter;
