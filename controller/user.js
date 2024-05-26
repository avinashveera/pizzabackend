const user = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
JWT_SEC="ilovenolove"

exports.register = async (req, res) => {
 
    
    const { name, email, password } = req.body;
   

    try {

      const User =await user.findOne({email})


        if (User) {
      
            res.status(300).json({
                success:false,
                message:"user exist"
            })
        }
        else {



         const small = new user({ name,email,password });
             
        small.save().then(()=>{
            res.status(200).json({
                success:true,
                message:"user created successfully"
            })
        });

    

        }


    } catch (error) {

        res.status(500).json({
            message: error
        })

    }


}

//login 

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const User =await user.findOne({email})

    console.log(User)
    if (!User) {

        return res.status(400).json({
            success: false,
            message: "user not found"
        })



    }


    const isMatch = await bcrypt.compare(password, User.password)

    if (!isMatch) {
        return res.status(400).json({
            success: "fail",
            message: "wrong password"

        })
    }

    const token = jwt.sign({
        _id: User._id
    },
        JWT_SEC
    )

    const option = {
        // expires: Date.now + 90 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
    res.status(200).cookie("token", token, option).json({
        success: true,
        data: User,
        token
    })




}


exports.follow = async (req, res) => {

    const { id } = req.params

    try {
        const follUsr = await user.findById(id)
        if (follUsr) {
            const User = await user.findById(req.user._id)

            const indexF = (arr, arg) => {
                for (let index = 0; index < arr.length; index++) {
                    if (arr[index] === arg) {
                        return index;
                    }

                }
            }





            if (User.following.includes(follUsr._id)) {


                const index = indexF(User.following, follUsr._id)
                const indexFoll = indexF(User.following, follUsr._id)

                User.following.splice(index, 1)
                await User.save();

                follUsr.followers.splice(index, 1)
                await follUsr.save();

                res.status(200).json({
                    success: true,
                    message: "unfollow"
                })


            } else {
                User.following.push(follUsr._id)
              await  User.save();

                follUsr.followers.push(User._id)
               await follUsr.save();

                res.status(200).json({
                    success: true,
                    message: "follow"
                })
            }

        }


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error
        })

    }

}


exports.logout=(req,res)=>{

    try {
        res.status(200).cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
        }).json({
            success:true,
            message:"succesfully logout"
        })

        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error
        })
        
    }

}

exports.updatePassword=async(req,res)=>{

    try {

        const {newpassword,oldpassword} =req.body;
        const User=user.findById(req.user._id)

        const isMatch = await bcrypt.compare(User.password,oldpassword)

        if(!isMatch){
            res.status(300).json({
                success:false,
                message:"old password wrong"
            })
        }else{

            User.password=newpassword;
            await User.save()


            res.status(200).json({
                success:true,
                message:"password updated"
            })

        }


        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}

exports.nameEmail=(req,res)=>{
    try {

        const {name,email} =req.body;
        const User=user.findById(req.user._id)

        if(name){
            User.name=name;
            User.save()
        }

        if(email){
            User.email=email;
            User.save()
        }

        res.status(200).json({
            success:true,
            message:"updated"
        })


        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

