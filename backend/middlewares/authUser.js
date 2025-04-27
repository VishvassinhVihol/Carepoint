// user authentication middleware

const jwt = require('jsonwebtoken')


const getUserId = (req,res,next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:'Login again permission denied'})
        }
        
        
    
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)//it will automatically decode the token
        req.body.id = decodeToken.id 
    
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = getUserId