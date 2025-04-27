const jwt = require('jsonwebtoken')

const getDoctorId =  (req,res,next) => {
  try {
    let {dtoken} = req.headers

    
    if(!dtoken){
        return res.json({success:false,message:'Login again permission denied in authDoctor'})
    }

    //now doctor loggein chhe to aapde teni id return karisu
    const decodeToken = jwt.verify(dtoken,process.env.JWT_SECRET)
    req.body.id = decodeToken.id
    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

module.exports = getDoctorId