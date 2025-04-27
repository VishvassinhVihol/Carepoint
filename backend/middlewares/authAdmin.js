// middleware to authenticate admin
const jwt = require('jsonwebtoken')

const authAdmin = (req,res,next) => {

    const {atoken} = req.headers

    
    
    if(!atoken){
        return res.json({success:false,message:'Login again permission denied'})
    }

    const decodeToken = jwt.verify(atoken,process.env.JWT_SECRET)//it will automatically decode the token
    if(decodeToken != process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:'Invalid token'})
    }
    next()
}

module.exports = authAdmin