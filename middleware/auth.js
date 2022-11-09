const User=require('../models/user')
const jwt=require('jsonwebtoken')

exports.isAuth=async(req,res,next)=>{


    const {token}=req.headers

    if(!token){
        res.status(401).json({
            message:"invalid user"
        })
    }

else{


    const decode= jwt.verify(token,process.env.JWT_SEC)

    req.user=await User.findById(decode._id)

    next();
}


}